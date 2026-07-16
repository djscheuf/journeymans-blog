const fs = require('fs');
const path = require('path');

const descriptionsDir = path.join(__dirname, '../source/img/post_img/descriptions');
const outputPath = path.join(__dirname, '../source/img/post_img/image-index.json');

// Read all description files
const descriptionFiles = fs.readdirSync(descriptionsDir)
  .filter(f => f.endsWith('.md') && f !== 'images-to-process.json');

const images = [];

descriptionFiles.forEach(file => {
  const content = fs.readFileSync(path.join(descriptionsDir, file), 'utf-8');
  const filename = file.replace('.md', '');
  
  // Parse markdown sections
  const sections = {};
  let currentSection = null;
  let currentContent = [];
  
  content.split('\n').forEach(line => {
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      currentSection = line.replace('## ', '').trim();
      currentContent = [];
    } else if (line.startsWith('# ')) {
      // Skip title
    } else if (currentSection) {
      currentContent.push(line);
    }
  });
  
  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }
  
  // Parse list items from sections
  const parseList = (text) => {
    if (!text) return [];
    return text.split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.replace('- ', '').trim());
  };
  
  const parseMood = (text) => {
    if (!text) return [];
    return text.split(',').map(m => m.trim());
  };
  
  images.push({
    filename: filename,
    path: `/img/post_img/${filename}`,
    description: sections['Visual Description'] || '',
    themes: parseList(sections['Themes']),
    concepts: parseList(sections['Concepts']),
    mood: parseMood(sections['Mood']),
    use_cases: parseList(sections['Use Cases'])
  });
});

// Sort by filename for consistency
images.sort((a, b) => a.filename.localeCompare(b.filename));

const index = {
  version: '1.0',
  generated: new Date().toISOString(),
  count: images.length,
  images: images
};

fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

console.log(`\n✅ Generated image index with ${images.length} images`);
console.log(`📄 Output: ${outputPath}`);
console.log(`\nSample entries:`);
images.slice(0, 3).forEach(img => {
  console.log(`\n${img.filename}:`);
  console.log(`  Themes: ${img.themes.slice(0, 3).join(', ')}`);
  console.log(`  Concepts: ${img.concepts.slice(0, 3).join(', ')}`);
});
