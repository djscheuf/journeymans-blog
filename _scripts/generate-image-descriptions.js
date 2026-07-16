const fs = require('fs');
const path = require('path');

// Read the recent images JSON
const recentImagesPath = path.join(__dirname, '../source/img/post_img/recent-images.json');
const recentImages = JSON.parse(fs.readFileSync(recentImagesPath, 'utf-8'));

// Filter out external URLs
const localImages = recentImages.filter(img => !img.normalizedPath.startsWith('http'));

console.log(`Processing ${localImages.length} local images...`);

// Create descriptions directory
const descriptionsDir = path.join(__dirname, '../source/img/post_img/descriptions');
if (!fs.existsSync(descriptionsDir)) {
  fs.mkdirSync(descriptionsDir, { recursive: true });
}

// Output list of images for AI processing
const imageList = localImages.map(img => {
  const filename = path.basename(img.normalizedPath);
  const fullPath = path.join(__dirname, '../source/img', img.normalizedPath);
  
  return {
    filename: filename,
    fullPath: fullPath,
    normalizedPath: img.normalizedPath,
    usageCount: img.usageCount,
    posts: img.posts.map(p => p.title)
  };
});

// Save list for reference
const outputPath = path.join(descriptionsDir, 'images-to-process.json');
fs.writeFileSync(outputPath, JSON.stringify(imageList, null, 2));

console.log(`\nImage list saved to: ${outputPath}`);
console.log(`\nImages to process:`);
imageList.forEach((img, idx) => {
  console.log(`${idx + 1}. ${img.filename} (used in ${img.usageCount} post${img.usageCount > 1 ? 's' : ''})`);
});
