/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /**
   * Google Analytics 4 Measurement ID
   * Format: G-XXXXXXXXXX
   * Get from GA4 Admin > Data Streams > Web > Measurement ID
   */
  readonly PUBLIC_GA_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
