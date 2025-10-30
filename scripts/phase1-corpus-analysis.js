#!/usr/bin/env node

/**
 * Phase 1: Corpus Analysis
 * 
 * Analyzes all blog posts to:
 * 1. Identify recurring themes and concepts
 * 2. Propose natural groupings
 * 3. Suggest tag vocabulary based on actual content
 * 4. Identify outliers and edge cases
 * 
 * This prepares the groundwork for Phase 2 individual post tagging.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(PROJECT_ROOT, 'source', '_posts');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'scripts', 'analysis-output');

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
            filename: path.basename(filepath),
            title: frontMatter.title || 'Untitled',
            date: frontMatter.date || '',
            categories: Array.isArray(frontMatter.categories) 
                ? frontMatter.categories 
                : (frontMatter.categories ? [frontMatter.categories] : []),
            tags: Array.isArray(frontMatter.tags) 
                ? frontMatter.tags 
                : (frontMatter.tags ? [frontMatter.tags] : []),
            description: frontMatter.description || '',
            content: markdownContent,
            wordCount: markdownContent.split(/\s+/).length
        };
    } catch (error) {
        console.error(`Error parsing ${filepath}:`, error.message);
        return null;
    }
}

/**
 * Normalize tag/category names for comparison
 */
function normalizeText(text) {
    return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Extract key phrases from content (simple n-gram extraction)
 */
function extractKeyPhrases(text, minFreq = 3) {
    const words = text.toLowerCase()
        .replace(/[^\w\s-]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3 && !isStopWord(w));
    
    // Count bigrams and trigrams
    const phrases = new Map();
    
    for (let i = 0; i < words.length - 1; i++) {
        const bigram = `${words[i]} ${words[i + 1]}`;
        phrases.set(bigram, (phrases.get(bigram) || 0) + 1);
        
        if (i < words.length - 2) {
            const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
            phrases.set(trigram, (phrases.get(trigram) || 0) + 1);
        }
    }
    
    // Filter by minimum frequency
    return Array.from(phrases.entries())
        .filter(([_, count]) => count >= minFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50);
}

/**
 * Simple stop word list
 */
function isStopWord(word) {
    const stopWords = new Set([
        'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have',
        'they', 'will', 'your', 'what', 'been', 'more', 'when', 'there',
        'their', 'which', 'about', 'into', 'than', 'them', 'these', 'some',
        'could', 'would', 'should', 'other', 'only', 'also', 'then', 'just',
        'like', 'make', 'know', 'take', 'think', 'want', 'need', 'work'
    ]);
    return stopWords.has(word);
}

/**
 * Analyze all posts and generate statistics
 */
function analyzeCorpus() {
    console.log('🔍 Starting Phase 1: Corpus Analysis\n');
    
    // Read all markdown files
    const files = fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(POSTS_DIR, f));
    
    console.log(`📚 Found ${files.length} posts\n`);
    
    // Parse all posts
    const posts = files
        .map(parseMarkdownFile)
        .filter(p => p !== null);
    
    console.log(`✅ Successfully parsed ${posts.length} posts\n`);
    
    // Collect statistics
    const stats = {
        totalPosts: posts.length,
        totalWords: posts.reduce((sum, p) => sum + p.wordCount, 0),
        categories: new Map(),
        tags: new Map(),
        categoryTagCombos: new Map(),
        postsWithoutTags: [],
        postsWithoutCategories: [],
        tagVariations: new Map(), // Track similar tags
        allContent: ''
    };
    
    // Analyze each post
    posts.forEach(post => {
        // Categories
        post.categories.forEach(cat => {
            const normalized = normalizeText(cat);
            if (!stats.categories.has(normalized)) {
                stats.categories.set(normalized, {
                    original: cat,
                    count: 0,
                    posts: []
                });
            }
            const catData = stats.categories.get(normalized);
            catData.count++;
            catData.posts.push(post.title);
        });
        
        // Tags
        post.tags.forEach(tag => {
            const normalized = normalizeText(tag);
            if (!stats.tags.has(normalized)) {
                stats.tags.set(normalized, {
                    original: tag,
                    count: 0,
                    posts: [],
                    variations: new Set()
                });
            }
            const tagData = stats.tags.get(normalized);
            tagData.count++;
            tagData.posts.push(post.title);
            tagData.variations.add(tag);
        });
        
        // Track posts without metadata
        if (post.tags.length === 0) {
            stats.postsWithoutTags.push(post.title);
        }
        if (post.categories.length === 0) {
            stats.postsWithoutCategories.push(post.title);
        }
        
        // Category-Tag combinations
        post.categories.forEach(cat => {
            post.tags.forEach(tag => {
                const combo = `${normalizeText(cat)} | ${normalizeText(tag)}`;
                stats.categoryTagCombos.set(combo, 
                    (stats.categoryTagCombos.get(combo) || 0) + 1);
            });
        });
        
        // Accumulate all content for phrase extraction
        stats.allContent += ' ' + post.content;
    });
    
    return { posts, stats };
}

/**
 * Generate analysis report
 */
function generateReport(posts, stats) {
    const report = [];
    
    report.push('# Phase 1: Corpus Analysis Report');
    report.push(`Generated: ${new Date().toISOString()}`);
    report.push('');
    report.push('---');
    report.push('');
    
    // Overview
    report.push('## Overview');
    report.push('');
    report.push(`- **Total Posts:** ${stats.totalPosts}`);
    report.push(`- **Total Words:** ${stats.totalWords.toLocaleString()}`);
    report.push(`- **Average Words per Post:** ${Math.round(stats.totalWords / stats.totalPosts)}`);
    report.push(`- **Unique Categories:** ${stats.categories.size}`);
    report.push(`- **Unique Tags:** ${stats.tags.size}`);
    report.push(`- **Posts Without Tags:** ${stats.postsWithoutTags.length}`);
    report.push(`- **Posts Without Categories:** ${stats.postsWithoutCategories.length}`);
    report.push('');
    report.push('---');
    report.push('');
    
    // Current Categories
    report.push('## Current Category Distribution');
    report.push('');
    const sortedCategories = Array.from(stats.categories.entries())
        .sort((a, b) => b[1].count - a[1].count);
    
    report.push('| Category | Count | % of Posts |');
    report.push('|----------|-------|------------|');
    sortedCategories.forEach(([normalized, data]) => {
        const percentage = ((data.count / stats.totalPosts) * 100).toFixed(1);
        report.push(`| ${data.original} | ${data.count} | ${percentage}% |`);
    });
    report.push('');
    report.push('---');
    report.push('');
    
    // Current Tags
    report.push('## Current Tag Distribution');
    report.push('');
    report.push('### Top 50 Tags by Frequency');
    report.push('');
    const sortedTags = Array.from(stats.tags.entries())
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 50);
    
    report.push('| Tag | Count | Variations | % of Posts |');
    report.push('|-----|-------|------------|------------|');
    sortedTags.forEach(([normalized, data]) => {
        const percentage = ((data.count / stats.totalPosts) * 100).toFixed(1);
        const variations = Array.from(data.variations).join(', ');
        report.push(`| ${data.original} | ${data.count} | ${variations} | ${percentage}% |`);
    });
    report.push('');
    
    // Single-use tags
    const singleUseTags = Array.from(stats.tags.entries())
        .filter(([_, data]) => data.count === 1)
        .sort((a, b) => a[1].original.localeCompare(b[1].original));
    
    report.push('### Single-Use Tags (Candidates for Consolidation)');
    report.push('');
    report.push(`Found ${singleUseTags.length} tags used only once:`);
    report.push('');
    singleUseTags.forEach(([_, data]) => {
        report.push(`- ${data.original} (in: "${data.posts[0]}")`);
    });
    report.push('');
    report.push('---');
    report.push('');
    
    // Tag Variations (inconsistent capitalization/naming)
    report.push('## Tag Consistency Issues');
    report.push('');
    const inconsistentTags = Array.from(stats.tags.entries())
        .filter(([_, data]) => data.variations.size > 1);
    
    if (inconsistentTags.length > 0) {
        report.push('### Tags with Multiple Variations');
        report.push('');
        inconsistentTags.forEach(([normalized, data]) => {
            report.push(`- **${normalized}** (${data.count} uses):`);
            data.variations.forEach(variation => {
                report.push(`  - "${variation}"`);
            });
        });
        report.push('');
    }
    report.push('---');
    report.push('');
    
    // Most common category-tag combinations
    report.push('## Category-Tag Relationships');
    report.push('');
    report.push('### Top 20 Category-Tag Combinations');
    report.push('');
    const topCombos = Array.from(stats.categoryTagCombos.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);
    
    report.push('| Category | Tag | Count |');
    report.push('|----------|-----|-------|');
    topCombos.forEach(([combo, count]) => {
        const [cat, tag] = combo.split(' | ');
        report.push(`| ${cat} | ${tag} | ${count} |`);
    });
    report.push('');
    report.push('---');
    report.push('');
    
    // Key phrases from content
    report.push('## Recurring Themes (Content Analysis)');
    report.push('');
    report.push('### Top 50 Recurring Phrases');
    report.push('');
    console.log('🔍 Extracting key phrases from content...');
    const keyPhrases = extractKeyPhrases(stats.allContent, 5);
    
    report.push('| Phrase | Frequency |');
    report.push('|--------|-----------|');
    keyPhrases.forEach(([phrase, count]) => {
        report.push(`| ${phrase} | ${count} |`);
    });
    report.push('');
    report.push('---');
    report.push('');
    
    // Proposed category mapping
    report.push('## Proposed Category Mapping');
    report.push('');
    report.push('Based on the analysis, here are suggested mappings to the new 3-category structure:');
    report.push('');
    report.push('### Software (The craft of writing code)');
    report.push('**Current categories that should map here:**');
    report.push('- Software Development');
    report.push('- Tools');
    report.push('- Technical posts about specific languages/frameworks');
    report.push('');
    report.push('### Engineering (The discipline of building systems)');
    report.push('**Current categories that should map here:**');
    report.push('- Professional Development (subset - technical practices)');
    report.push('- Posts about architecture, testing, agile processes');
    report.push('- Posts about system design and quality');
    report.push('');
    report.push('### Leadership (The art of working with people)');
    report.push('**Current categories that should map here:**');
    report.push('- Professional Development (subset - people/team focus)');
    report.push('- Personal Development');
    report.push('- Posts about teams, communication, coaching, culture');
    report.push('');
    report.push('---');
    report.push('');
    
    // Recommendations
    report.push('## Recommendations for Tag Vocabulary');
    report.push('');
    report.push('### Practice Tags (Suggested)');
    const practiceTags = sortedTags
        .filter(([norm]) => 
            norm.includes('agile') || norm.includes('scrum') || norm.includes('tdd') ||
            norm.includes('retrospective') || norm.includes('facilitation') ||
            norm.includes('coaching') || norm.includes('mentorship') || norm.includes('refactoring')
        )
        .map(([_, data]) => data.original);
    practiceTags.forEach(tag => report.push(`- ${tag}`));
    report.push('');
    
    report.push('### Concept Tags (Suggested)');
    const conceptTags = sortedTags
        .filter(([norm]) => 
            norm.includes('culture') || norm.includes('communication') || norm.includes('trust') ||
            norm.includes('effectiveness') || norm.includes('quality') || norm.includes('architecture') ||
            norm.includes('testing') || norm.includes('learning') || norm.includes('growth')
        )
        .map(([_, data]) => data.original);
    conceptTags.forEach(tag => report.push(`- ${tag}`));
    report.push('');
    
    report.push('### Audience/Scope Tags (Suggested)');
    const audienceTags = sortedTags
        .filter(([norm]) => 
            norm.includes('team') || norm.includes('organization') || norm.includes('developer') ||
            norm.includes('manager') || norm.includes('remote') || norm.includes('career')
        )
        .map(([_, data]) => data.original);
    audienceTags.forEach(tag => report.push(`- ${tag}`));
    report.push('');
    
    report.push('---');
    report.push('');
    
    // Posts needing review
    report.push('## Posts Requiring Manual Review');
    report.push('');
    if (stats.postsWithoutTags.length > 0) {
        report.push('### Posts Without Tags');
        stats.postsWithoutTags.forEach(title => {
            report.push(`- ${title}`);
        });
        report.push('');
    }
    
    if (stats.postsWithoutCategories.length > 0) {
        report.push('### Posts Without Categories');
        stats.postsWithoutCategories.forEach(title => {
            report.push(`- ${title}`);
        });
        report.push('');
    }
    
    return report.join('\n');
}

/**
 * Generate detailed post listing for LLM analysis
 */
function generatePostListing(posts) {
    const listing = [];
    
    listing.push('# Complete Post Listing for LLM Analysis');
    listing.push(`Generated: ${new Date().toISOString()}`);
    listing.push('');
    listing.push('This file contains all post metadata for detailed analysis.');
    listing.push('');
    listing.push('---');
    listing.push('');
    
    posts.forEach((post, index) => {
        listing.push(`## Post ${index + 1}: ${post.title}`);
        listing.push('');
        listing.push(`- **Filename:** ${post.filename}`);
        listing.push(`- **Date:** ${post.date}`);
        listing.push(`- **Word Count:** ${post.wordCount}`);
        listing.push(`- **Current Categories:** ${post.categories.join(', ') || 'None'}`);
        listing.push(`- **Current Tags:** ${post.tags.join(', ') || 'None'}`);
        if (post.description) {
            listing.push(`- **Description:** ${post.description}`);
        }
        listing.push('');
        listing.push('**Content Preview (first 500 chars):**');
        listing.push('```');
        listing.push(post.content.substring(0, 500).trim() + '...');
        listing.push('```');
        listing.push('');
        listing.push('---');
        listing.push('');
    });
    
    return listing.join('\n');
}

/**
 * Generate JSON data for programmatic analysis
 */
function generateJSONData(posts, stats) {
    return {
        metadata: {
            generatedAt: new Date().toISOString(),
            totalPosts: stats.totalPosts,
            totalWords: stats.totalWords,
            uniqueCategories: stats.categories.size,
            uniqueTags: stats.tags.size
        },
        categories: Array.from(stats.categories.entries()).map(([normalized, data]) => ({
            normalized,
            original: data.original,
            count: data.count,
            percentage: ((data.count / stats.totalPosts) * 100).toFixed(2),
            posts: data.posts
        })).sort((a, b) => b.count - a.count),
        tags: Array.from(stats.tags.entries()).map(([normalized, data]) => ({
            normalized,
            original: data.original,
            count: data.count,
            percentage: ((data.count / stats.totalPosts) * 100).toFixed(2),
            variations: Array.from(data.variations),
            posts: data.posts
        })).sort((a, b) => b.count - a.count),
        posts: posts.map(p => ({
            filename: p.filename,
            title: p.title,
            date: p.date,
            wordCount: p.wordCount,
            categories: p.categories,
            tags: p.tags,
            description: p.description
        }))
    };
}

/**
 * Main execution
 */
function main() {
    try {
        // Create output directory
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }
        
        // Analyze corpus
        const { posts, stats } = analyzeCorpus();
        
        // Generate reports
        console.log('📝 Generating analysis report...');
        const report = generateReport(posts, stats);
        const reportPath = path.join(OUTPUT_DIR, 'phase1-analysis-report.md');
        fs.writeFileSync(reportPath, report);
        console.log(`✅ Report saved to: ${reportPath}\n`);
        
        // console.log('📝 Generating detailed post listing...');
        // const listing = generatePostListing(posts);
        // const listingPath = path.join(OUTPUT_DIR, 'phase1-post-listing.md');
        // fs.writeFileSync(listingPath, listing);
        // console.log(`✅ Post listing saved to: ${listingPath}\n`);
        
        // console.log('📝 Generating JSON data...');
        // const jsonData = generateJSONData(posts, stats);
        // const jsonPath = path.join(OUTPUT_DIR, 'phase1-analysis-data.json');
        // fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
        // console.log(`✅ JSON data saved to: ${jsonPath}\n`);
        
        console.log('🎉 Phase 1 Corpus Analysis Complete!\n');
        console.log('Next Steps:');
        console.log('1. Review the analysis report');
        console.log('2. Refine the proposed tag vocabulary');
        console.log('3. Finalize category mapping rules');
        console.log('4. Proceed to Phase 2: Individual Post Analysis');
        
    } catch (error) {
        console.error('❌ Error during analysis:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { analyzeCorpus, generateReport, parseMarkdownFile };
