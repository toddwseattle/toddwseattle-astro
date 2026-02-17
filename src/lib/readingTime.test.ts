import { describe, it, expect } from "vitest";
import { calculateReadingTime, formatReadingTime } from "./readingTime";

describe("calculateReadingTime", () => {
  it("should return 1 minute for empty string", () => {
    expect(calculateReadingTime("")).toBe(1);
  });

  it("should return 1 minute for whitespace-only string", () => {
    expect(calculateReadingTime("   \n\t  ")).toBe(1);
  });

  it("should return 1 minute for 200 words or fewer", () => {
    // Generate exactly 200 words
    const words = Array(200).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(1);
  });

  it("should return 2 minutes for 201 words", () => {
    const words = Array(201).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(2);
  });

  it("should return 5 minutes for 1000 words", () => {
    const words = Array(1000).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(5);
  });

  it("should handle multiple spaces correctly", () => {
    const content = "word   word   word";
    expect(calculateReadingTime(content)).toBe(1);
  });

  it("should handle newlines as word separators", () => {
    const content = "word\nword\nword";
    expect(calculateReadingTime(content)).toBe(1);
  });

  it("should handle tabs as word separators", () => {
    const content = "word\tword\tword";
    expect(calculateReadingTime(content)).toBe(1);
  });

  it("should handle mixed whitespace correctly", () => {
    const content = "word \n\t word  \n\n  word";
    expect(calculateReadingTime(content)).toBe(1);
  });

  it("should round up to nearest minute", () => {
    // 401 words = 2.005 minutes, should round up to 3
    const words = Array(401).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(3);
  });
});

describe("formatReadingTime", () => {
  it("should format 1 minute correctly", () => {
    expect(formatReadingTime(1)).toBe("1 min read");
  });

  it("should format multiple minutes correctly", () => {
    expect(formatReadingTime(5)).toBe("5 min read");
  });

  it("should format large numbers correctly", () => {
    expect(formatReadingTime(42)).toBe("42 min read");
  });
});
