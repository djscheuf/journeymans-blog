#!/usr/bin/env node

/**
 * Calculate word count and reading time for blog post content
 * 
 * Usage: node calculate-reading-stats.js "content string"
 * 
 * Output format: JSON with wordCount and readingTime
 */

function calculateReadingStats(content) {
  // Count words by splitting on whitespace and filtering empty strings
  const words = content.trim().split(/\s+/).filter(word => word.length > 0);
  const actualWordCount = words.length;
  
  // Round to nearest 10
  const estimatedWordCount = Math.round(actualWordCount / 10) * 10;
  
  // Calculate reading time: word count / 250 words per minute
  const readingTimeMinutes = estimatedWordCount / 250;
  
  // Round to nearest 0.5 minutes, with minimum of 0.5
  const estimatedReadingTime = Math.max(0.5, Math.round(readingTimeMinutes * 2) / 2);
  
  return {
    wordCount: estimatedWordCount,
    readingTime: estimatedReadingTime
  };
}

// Main execution
if (require.main === module) {
  const content = process.argv[2];
  
  if (!content) {
    console.error('Error: No content provided');
    console.error('Usage: node calculate-reading-stats.js "content string"');
    process.exit(1);
  }
  
  const stats = calculateReadingStats(content);
  
  // Output formatted string for blog post
  console.log(`~${stats.wordCount} Words | ~${stats.readingTime}min Read`);
  
  // Also output JSON for programmatic use (to stderr so it doesn't interfere with the formatted output)
  console.error(JSON.stringify(stats, null, 2));
}

module.exports = { calculateReadingStats };
