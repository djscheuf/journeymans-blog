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

function getPostContent(content) {
    const match = content.match(/^---\s*\n.*?\n---\s*\n(.*)$/s);
    return match ? match[1].trim() : '';
}

function analyzePosts(postsDir, sinceYear = 2023) {
    const posts = [];
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
        
        const postContent = getPostContent(content);
        const excerpt = postContent.substring(0, 500);
        
        posts.push({
            filename,
            title: frontmatter.title || 'Untitled',
            date: dateStr,
            tags: frontmatter.tags || [],
            categories: frontmatter.categories || [],
            excerpt: excerpt.replace(/\n/g, ' ').trim()
        });
    }
    
    posts.sort((a, b) => a.date.localeCompare(b.date));
    return posts;
}

function main() {
    const postsDir = 'source/_posts';
    
    console.log('Analyzing blog posts since 2023 for category analysis...\n');
    const posts = analyzePosts(postsDir, 2023);
    
    console.log(`Total posts since 2023: ${posts.length}\n`);
    
    const now = new Date().toISOString().split('T')[0] + ' ' + 
                new Date().toTimeString().split(' ')[0];
    
    let output = `Category Analysis - Post Details\n`;
    output += `Generated: ${now}\n`;
    output += `${'='.repeat(80)}\n\n`;
    output += `Total posts analyzed: ${posts.length}\n`;
    output += `Time period: 2023 onwards\n\n`;
    output += `${'='.repeat(80)}\n\n`;
    
    for (const post of posts) {
        output += `FILE: ${post.filename}\n`;
        output += `TITLE: ${post.title}\n`;
        output += `DATE: ${post.date}\n`;
        output += `TAGS: ${post.tags.join(', ') || 'none'}\n`;
        output += `CURRENT CATEGORIES: ${post.categories.join(', ') || 'none'}\n`;
        output += `EXCERPT: ${post.excerpt}\n`;
        output += `${'-'.repeat(80)}\n\n`;
    }
    
    fs.writeFileSync('category_analysis_posts.txt', output);
    console.log('✓ Post details saved to category_analysis_posts.txt');
    console.log('\nReview the file to understand post content and suggest categories.');
}

main();
