/**
 * Calculate reading time for a text content
 * Uses 200 words per minute as average adult reading speed
 */

const WORDS_PER_MINUTE = 200;

/**
 * Calculate the estimated reading time in minutes
 * @param content - The text content to calculate reading time for
 * @returns The reading time in minutes (minimum 1)
 */
export function calculateReadingTime(content: string): number {
  if (!content || content.trim().length === 0) {
    return 1;
  }

  // Split by whitespace (spaces, tabs, newlines)
  const words = content.trim().split(/\s+/);
  const wordCount = words.filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return Math.max(1, minutes);
}

/**
 * Format reading time as a human-readable string
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
