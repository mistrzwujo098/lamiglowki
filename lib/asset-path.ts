/**
 * Helper function to prepend basePath to asset URLs
 * This ensures images and other static assets work correctly with Cloudflare Worker routing
 *
 * Note: Since Next.js doesn't automatically add basePath to public assets in Image component,
 * we use assetPrefix in next.config.ts which handles this globally.
 * This function is kept for backward compatibility and future use.
 */
export function assetPath(path: string): string {
  // assetPrefix in next.config.ts handles this automatically now
  // Just return the path as-is
  return path;
}
