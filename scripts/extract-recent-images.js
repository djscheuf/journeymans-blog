const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const postsDir = path.join(__dirname, '../source/_posts');
const cutoffDate = new Date('2023-02-18');

function extractFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontMatterRegex);
  
  if (!match) return null;
  
  try {
    return yaml.load(match[1]);
  } catch (e) {
    return null;
  }
}

function extractImages() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const imageMap = new Map();
  const postsByImage = new Map();
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const frontMatter = extractFrontMatter(content);
    
    if (!frontMatter || !frontMatter.date) return;
    
    const postDate = new Date(frontMatter.date);
    if (postDate < cutoffDate) return;
    
    // Extract photos from front matter
    if (frontMatter.photos && Array.isArray(frontMatter.photos)) {
      frontMatter.photos.forEach(photo => {
        // Normalize path - remove leading slash and img/ prefix if present
        let normalizedPath = photo.replace(/^\//, '').replace(/^img\//, '');
        
        if (!imageMap.has(normalizedPath)) {
          imageMap.set(normalizedPath, {
            path: photo,
            normalizedPath: normalizedPath,
            posts: []
          });
          postsByImage.set(normalizedPath, []);
        }
        
        postsByImage.get(normalizedPath).push({
          file: file,
          title: frontMatter.title || file,
          date: frontMatter.date
        });
      });
    }
  });
  
  // Combine data
  const results = [];
  imageMap.forEach((data, key) => {
    results.push({
      ...data,
      posts: postsByImage.get(key),
      usageCount: postsByImage.get(key).length
    });
  });
  
  // Sort by usage count descending
  results.sort((a, b) => b.usageCount - a.usageCount);
  
  return results;
}

const images = extractImages();

console.log(`\n=== Images Used in Posts (Last 3 Years) ===`);
console.log(`Total unique images: ${images.length}\n`);

images.forEach(img => {
  console.log(`${img.normalizedPath}`);
  console.log(`  Original path: ${img.path}`);
  console.log(`  Used in ${img.usageCount} post(s):`);
  img.posts.forEach(post => {
    console.log(`    - ${post.title} (${post.date})`);
  });
  console.log('');
});

// Also output JSON for programmatic use
const outputPath = path.join(__dirname, '../source/img/post_img/recent-images.json');
fs.writeFileSync(outputPath, JSON.stringify(images, null, 2));
console.log(`\nJSON output saved to: ${outputPath}`);
