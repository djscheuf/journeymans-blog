const fs = require('fs');
const path = require('path');

function extractFrontmatter(content) {
    const match = content.match(/^---\s*\n(.*?)\n---\s*\n/s);
    if (!match) return null;
    
    const frontmatter = {};
    const lines = match[1].split('\n');
    let currentKey = null;
    let inArray = false;
    
    for (const line of lines) {
        if (line.trim().startsWith('-') && inArray) {
            const value = line.trim().substring(1).trim();
            if (value) {
                frontmatter[currentKey].push(value);
            }
        } else if (line.includes(':')) {
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            if (key === 'tags' || key === 'categories') {
                frontmatter[key] = [];
                currentKey = key;
                inArray = true;
                if (value) {
                    frontmatter[key].push(value);
                }
            } else {
                frontmatter[key] = value;
                inArray = false;
            }
        }
    }
    
    return frontmatter;
}

function analyzePosts(postsDir, sinceYear = 2023) {
    const allTags = [];
    let postCount = 0;
    const postsWithTags = [];
    
    const files = fs.readdirSync(postsDir);
    
    for (const filename of files) {
        if (!filename.endsWith('.md')) continue;
        
        const filepath = path.join(postsDir, filename);
        const content = fs.readFileSync(filepath, 'utf-8');
        
        const frontmatter = extractFrontmatter(content);
        if (!frontmatter) continue;
        
        const dateStr = frontmatter.date;
        if (!dateStr) continue;
        
        const year = parseInt(dateStr.split('-')[0]);
        if (year < sinceYear) continue;
        
        postCount++;
        
        const tags = frontmatter.tags || [];
        if (tags.length > 0) {
            allTags.push(...tags);
            postsWithTags.push({
                filename,
                title: frontmatter.title || 'Untitled',
                date: dateStr,
                tags,
                tagCount: tags.length
            });
        }
    }
    
    return { allTags, postCount, postsWithTags };
}

function main() {
    const postsDir = 'source/_posts';
    
    console.log('Analyzing blog posts since 2023...\n');
    const { allTags, postCount, postsWithTags } = analyzePosts(postsDir, 2023);
    
    console.log(`Total posts since 2023: ${postCount}`);
    console.log(`Posts with tags: ${postsWithTags.length}`);
    console.log(`Total tag instances: ${allTags.length}`);
    
    const tagCounts = {};
    for (const tag of allTags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
    
    const uniqueTags = Object.keys(tagCounts);
    console.log(`Unique tags: ${uniqueTags.length}`);
    
    const tagCountsPerPost = postsWithTags.map(p => p.tagCount).filter(c => c > 0);
    if (tagCountsPerPost.length > 0) {
        const avgTags = tagCountsPerPost.reduce((a, b) => a + b, 0) / tagCountsPerPost.length;
        console.log(`Average tags per post: ${avgTags.toFixed(1)}`);
        console.log(`Max tags on a post: ${Math.max(...tagCountsPerPost)}`);
        console.log(`Min tags on a post: ${Math.min(...tagCountsPerPost)}`);
    }
    
    const sortedByCount = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1]);
    
    console.log('\n=== TOP 30 TAGS BY FREQUENCY ===');
    for (const [tag, count] of sortedByCount.slice(0, 30)) {
        console.log(`${tag.padEnd(30)} ${count.toString().padStart(3)} posts`);
    }
    
    console.log('\n=== ALL UNIQUE TAGS (ALPHABETICAL) ===');
    const sortedAlpha = Object.entries(tagCounts).sort((a, b) => a[0].localeCompare(b[0]));
    for (const [tag, count] of sortedAlpha) {
        console.log(`${tag.padEnd(30)} ${count.toString().padStart(3)} posts`);
    }
    
    const now = new Date().toISOString().split('T')[0] + ' ' + 
                new Date().toTimeString().split(' ')[0];
    
    let output = `Tag Analysis Results\n`;
    output += `Generated: ${now}\n`;
    output += `${'='.repeat(60)}\n\n`;
    output += `Total posts since 2023: ${postCount}\n`;
    output += `Posts with tags: ${postsWithTags.length}\n`;
    output += `Total tag instances: ${allTags.length}\n`;
    output += `Unique tags: ${uniqueTags.length}\n\n`;
    
    if (tagCountsPerPost.length > 0) {
        const avgTags = tagCountsPerPost.reduce((a, b) => a + b, 0) / tagCountsPerPost.length;
        output += `Average tags per post: ${avgTags.toFixed(1)}\n`;
        output += `Max tags on a post: ${Math.max(...tagCountsPerPost)}\n`;
        output += `Min tags on a post: ${Math.min(...tagCountsPerPost)}\n\n`;
    }
    
    output += `TOP 30 TAGS BY FREQUENCY\n`;
    output += `${'-'.repeat(60)}\n`;
    for (const [tag, count] of sortedByCount.slice(0, 30)) {
        output += `${tag.padEnd(30)} ${count.toString().padStart(3)} posts\n`;
    }
    
    output += `\n\nALL UNIQUE TAGS (ALPHABETICAL)\n`;
    output += `${'-'.repeat(60)}\n`;
    for (const [tag, count] of sortedAlpha) {
        output += `${tag.padEnd(30)} ${count.toString().padStart(3)} posts\n`;
    }
    
    fs.writeFileSync('tag_analysis_results.txt', output);
    console.log('\n✓ Results saved to tag_analysis_results.txt');
}

main();
