#!/usr/bin/env node

/**
 * Consolidate all Hexo blog posts into a single PDF.
 * This script reads all markdown files from source/_posts, extracts their metadata
 * (title, date, photos) and content, then generates a comprehensive PDF document.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const PDFDocument = require('pdfkit');
const axios = require('axios');
const { marked } = require('marked');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(PROJECT_ROOT, 'source', '_posts');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'consolidated_blog_posts.pdf');

/**
 * Parse a markdown file and extract YAML front matter and content
 */
function parseMarkdownFile(filepath) {
    try {
        const content = fs.readFileSync(filepath, 'utf-8');
        
        // Extract YAML front matter
        const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
        if (!yamlMatch) {
            console.warn(`No front matter found in ${filepath}`);
            return null;
        }
        
        const frontMatter = yaml.load(yamlMatch[1]);
        const markdownContent = yamlMatch[2];
        
        return {
            title: frontMatter.title || 'Untitled',
            date: frontMatter.date || '',
            photos: frontMatter.photos || [],
            description: frontMatter.description || '',
            categories: frontMatter.categories || [],
            tags: frontMatter.tags || [],
            content: markdownContent,
            filepath: filepath
        };
    } catch (error) {
        console.error(`Error parsing ${filepath}:`, error.message);
        return null;
    }
}

/**
 * Download an image from URL or load from local file
 */
async function downloadImage(url) {
    try {
        // Check if it's a local path (relative or starts with img/)
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            // Handle local image paths
            let localPath = url;
            
            // Remove leading slash if present
            if (localPath.startsWith('/')) {
                localPath = localPath.substring(1);
            }
            
            // Try to find the image in source directory
            const imagePath = path.join(PROJECT_ROOT, 'source', localPath);
            
            if (fs.existsSync(imagePath)) {
                return fs.readFileSync(imagePath);
            } else {
                console.warn(`Local image not found: ${imagePath}`);
                return null;
            }
        }
        
        // Download from URL
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            timeout: 10000
        });
        return Buffer.from(response.data);
    } catch (error) {
        console.warn(`Failed to download image ${url}:`, error.message);
        return null;
    }
}

/**
 * Parse markdown and return structured content with links preserved
 */
function parseMarkdownContent(mdContent) {
    const tokens = marked.lexer(mdContent);
    const paragraphs = [];
    
    function extractLinksFromText(text) {
        // Extract markdown links: [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const segments = [];
        let lastIndex = 0;
        let match;
        
        while ((match = linkRegex.exec(text)) !== null) {
            // Add text before link
            if (match.index > lastIndex) {
                segments.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index)
                });
            }
            
            // Add link
            segments.push({
                type: 'link',
                text: match[1],
                url: match[2]
            });
            
            lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
            segments.push({
                type: 'text',
                content: text.substring(lastIndex)
            });
        }
        
        return segments.length > 0 ? segments : [{ type: 'text', content: text }];
    }
    
    function processTokens(tokens, indent = '') {
        for (const token of tokens) {
            switch (token.type) {
                case 'heading':
                    paragraphs.push({
                        type: 'heading',
                        level: token.depth,
                        segments: extractLinksFromText(token.text)
                    });
                    break;
                case 'paragraph':
                    paragraphs.push({
                        type: 'paragraph',
                        segments: extractLinksFromText(token.text)
                    });
                    break;
                case 'list':
                    if (token.items) {
                        token.items.forEach(item => {
                            paragraphs.push({
                                type: 'list-item',
                                segments: extractLinksFromText(indent + '• ' + item.text)
                            });
                        });
                    }
                    break;
                case 'code':
                    paragraphs.push({
                        type: 'code',
                        segments: [{ type: 'text', content: token.text }]
                    });
                    break;
                case 'blockquote':
                    paragraphs.push({
                        type: 'blockquote',
                        segments: extractLinksFromText('  ' + token.text)
                    });
                    break;
                case 'space':
                    // Skip spaces
                    break;
                default:
                    if (token.text) {
                        paragraphs.push({
                            type: 'paragraph',
                            segments: extractLinksFromText(token.text)
                        });
                    }
            }
        }
    }
    
    processTokens(tokens);
    return paragraphs;
}

/**
 * Format date for display
 */
function formatDate(date) {
    if (!date) return '';
    
    try {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch (error) {
        return String(date);
    }
}

/**
 * Create PDF document from posts
 */
async function createPDF(posts, outputPath) {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: 'letter',
                margins: {
                    top: 54,
                    bottom: 54,
                    left: 54,
                    right: 54
                }
            });
            
            const stream = fs.createWriteStream(outputPath);
            doc.pipe(stream);
            
            // Add cover page
            doc.fontSize(32)
               .fillColor('#2C3E50')
               .text("Journeyman's Blog", { align: 'center' });
            
            doc.moveDown(1);
            doc.fontSize(16)
               .fillColor('#7F8C8D')
               .text('Consolidated Posts Collection', { align: 'center' });
            
            doc.moveDown(0.5);
            doc.fontSize(12)
               .text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, { align: 'center' })
               .text(`Total Posts: ${posts.length}`, { align: 'center' });
            
            doc.addPage();
            
            // Process each post
            for (let idx = 0; idx < posts.length; idx++) {
                const post = posts[idx];
                console.log(`Processing post ${idx + 1}/${posts.length}: ${post.title}`);
                
                // Add title
                doc.fontSize(18)
                   .fillColor('#2C3E50')
                   .font('Helvetica-Bold')
                   .text(post.title, { align: 'left' });
                
                doc.moveDown(0.3);
                
                // Add date
                if (post.date) {
                    doc.fontSize(10)
                       .fillColor('#7F8C8D')
                       .font('Helvetica-Oblique')
                       .text(`Published: ${formatDate(post.date)}`, { align: 'left' });
                }
                
                doc.moveDown(0.5);
                
                // Add photo if available
                if (post.photos && post.photos.length > 0) {
                    const photoUrl = Array.isArray(post.photos) ? post.photos[0] : post.photos;
                    if (photoUrl) {
                        try {
                            const imageBuffer = await downloadImage(photoUrl);
                            if (imageBuffer) {
                                const maxWidth = 450;
                                const maxHeight = 300;
                                
                                // Get page dimensions
                                const pageWidth = doc.page.width;
                                const leftMargin = doc.page.margins.left;
                                const rightMargin = doc.page.margins.right;
                                const availableWidth = pageWidth - leftMargin - rightMargin;
                                
                                // Calculate centered position
                                const imageX = leftMargin + (availableWidth - maxWidth) / 2;
                                const currentY = doc.y;
                                
                                // Add the image at centered position
                                doc.image(imageBuffer, imageX, currentY, {
                                    fit: [maxWidth, maxHeight]
                                });
                                
                                // Move cursor down past the image
                                // We need to calculate actual image height after fitting
                                const img = doc.openImage(imageBuffer);
                                const aspectRatio = img.height / img.width;
                                let actualHeight = maxWidth * aspectRatio;
                                if (actualHeight > maxHeight) {
                                    actualHeight = maxHeight;
                                }
                                
                                doc.y = currentY + actualHeight + 20; // Add 20 points of spacing
                            }
                        } catch (error) {
                            console.warn(`Could not add image for ${post.title}:`, error.message);
                        }
                    }
                }
                
                // Add content
                doc.fontSize(11)
                   .fillColor('#000000')
                   .font('Helvetica');
                
                const parsedContent = parseMarkdownContent(post.content);
                
                for (const para of parsedContent) {
                    try {
                        // Set font based on paragraph type
                        if (para.type === 'heading') {
                            const headingSizes = { 1: 16, 2: 14, 3: 12 };
                            doc.fontSize(headingSizes[para.level] || 12)
                               .font('Helvetica-Bold');
                        } else if (para.type === 'code') {
                            doc.fontSize(9)
                               .font('Courier');
                        } else {
                            doc.fontSize(11)
                               .font('Helvetica');
                        }
                        
                        // Render segments (text and links)
                        for (let i = 0; i < para.segments.length; i++) {
                            const segment = para.segments[i];
                            
                            if (segment.type === 'link') {
                                // Render clickable link
                                const linkText = segment.text;
                                const linkUrl = segment.url;
                                
                                doc.fillColor('#0066CC')
                                   .text(linkText, {
                                       link: linkUrl,
                                       underline: true,
                                       continued: i < para.segments.length - 1
                                   })
                                   .fillColor('#000000');
                            } else if (segment.content) {
                                // Render regular text
                                doc.text(segment.content, {
                                    continued: i < para.segments.length - 1
                                });
                            }
                        }
                        
                        // End the text line and add spacing
                        doc.text(''); // This ends any continued text
                        
                        if (para.type === 'heading') {
                            doc.moveDown(0.3);
                        } else {
                            doc.moveDown(0.5);
                        }
                        
                    } catch (error) {
                        console.warn(`Error adding paragraph:`, error.message);
                    }
                }
                
                // Add page break between posts (except for the last one)
                if (idx < posts.length - 1) {
                    doc.addPage();
                }
            }
            
            // Finalize PDF
            doc.end();
            
            stream.on('finish', () => {
                console.log('\n✓ PDF created successfully!');
                resolve();
            });
            
            stream.on('error', reject);
            
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Main function
 */
async function main() {
    console.log(`Reading posts from: ${POSTS_DIR}`);
    console.log(`Output PDF will be: ${OUTPUT_PATH}`);
    
    // Read all markdown files
    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(POSTS_DIR, file));
    
    // Parse all posts
    const posts = [];
    for (const file of files) {
        const post = parseMarkdownFile(file);
        if (post) {
            posts.push(post);
        }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });
    
    console.log(`\nFound ${posts.length} posts`);
    
    if (posts.length === 0) {
        console.log('No posts found!');
        return;
    }
    
    // Create PDF
    console.log('\nGenerating PDF...');
    await createPDF(posts, OUTPUT_PATH);
    
    console.log(`\n✓ Successfully created PDF with ${posts.length} posts`);
    console.log(`✓ Output: ${OUTPUT_PATH}`);
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });
}

module.exports = { parseMarkdownFile, createPDF };
