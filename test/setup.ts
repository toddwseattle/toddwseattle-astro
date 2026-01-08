import "@testing-library/jest-dom/vitest";

// Polyfill/override TextEncoder/TextDecoder for astro/container & esbuild
import { TextEncoder, TextDecoder } from "util";
// Force override to ensure correct instanceof behavior
// @ts-ignore
(globalThis as any).TextEncoder = TextEncoder;
// @ts-ignore
(globalThis as any).TextDecoder = TextDecoder as any;
