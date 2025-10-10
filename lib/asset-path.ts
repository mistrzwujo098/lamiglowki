/**
 * Helper function to prepend basePath to asset URLs
 * This ensures images and other static assets work correctly with Cloudflare Worker routing
 *
 * IMPORTANT: assetPrefix in next.config.ts does NOT work for <Image> src paths from public/
 * We must manually add basePath to all image paths.
 */
export function assetPath(path: string): string {
  const basePath = '/lamiglowki';

  // If path already starts with basePath, return as is
  if (path.startsWith(basePath)) {
    return path;
  }

  // If path starts with /, prepend basePath
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }

  // Otherwise return with basePath and leading /
  return `${basePath}/${path}`;
}
