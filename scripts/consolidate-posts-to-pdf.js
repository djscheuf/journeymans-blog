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
 * Download an image from URL
 */
async function downloadImage(url) {
    try {
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
 * Convert markdown to plain text while preserving structure
 */
function markdownToText(mdContent) {
    // Use marked to parse markdown
    const tokens = marked.lexer(mdContent);
    let text = '';
    
    function processTokens(tokens, indent = '') {
        let result = '';
        for (const token of tokens) {
            switch (token.type) {
                case 'heading':
                    result += '\n' + token.text + '\n\n';
                    break;
                case 'paragraph':
                    result += token.text + '\n\n';
                    break;
                case 'list':
                    if (token.items) {
                        token.items.forEach(item => {
                            result += indent + '• ' + item.text + '\n';
                        });
                        result += '\n';
                    }
                    break;
                case 'code':
                    result += '\n' + token.text + '\n\n';
                    break;
                case 'blockquote':
                    result += '  ' + token.text + '\n\n';
                    break;
                case 'space':
                    result += '\n';
                    break;
                default:
                    if (token.text) {
                        result += token.text + ' ';
                    }
            }
        }
        return result;
    }
    
    return processTokens(tokens);
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
                
                // Add categories and tags
                const metaInfo = [];
                if (post.categories && post.categories.length > 0) {
                    const cats = Array.isArray(post.categories) ? post.categories.join(', ') : String(post.categories);
                    metaInfo.push(`Categories: ${cats}`);
                }
                if (post.tags && post.tags.length > 0) {
                    const tags = Array.isArray(post.tags) ? post.tags.join(', ') : String(post.tags);
                    metaInfo.push(`Tags: ${tags}`);
                }
                
                if (metaInfo.length > 0) {
                    doc.fontSize(9)
                       .fillColor('#95A5A6')
                       .font('Helvetica')
                       .text(metaInfo.join(' | '), { align: 'left' });
                }
                
                doc.moveDown(0.5);
                
                // Add photo if available
                if (post.photos && post.photos.length > 0) {
                    const photoUrl = Array.isArray(post.photos) ? post.photos[0] : post.photos;
                    if (photoUrl) {
                        try {
                            const imageBuffer = await downloadImage(photoUrl);
                            if (imageBuffer) {
                                const maxWidth = 500;
                                const maxHeight = 300;
                                doc.image(imageBuffer, {
                                    fit: [maxWidth, maxHeight],
                                    align: 'left'
                                });
                                doc.moveDown(0.5);
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
                
                const textContent = markdownToText(post.content);
                const paragraphs = textContent.split('\n\n').filter(p => p.trim());
                
                for (const para of paragraphs) {
                    const trimmed = para.trim();
                    if (trimmed) {
                        try {
                            doc.text(trimmed, {
                                align: 'left',
                                lineGap: 4
                            });
                            doc.moveDown(0.5);
                        } catch (error) {
                            console.warn(`Error adding paragraph:`, error.message);
                        }
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
