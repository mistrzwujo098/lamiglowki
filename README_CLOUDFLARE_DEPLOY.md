# Cloudflare Pages Deployment Guide

## Build Configuration

W ustawieniach Cloudflare Pages ustaw:

### Build settings:
- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: (leave empty)
- **Node version**: 20

### Environment Variables:
```
MAILERLITE_API_KEY=your_api_key_here
NODE_VERSION=20
```

### Important Notes:

1. **Static files**: Wszystkie pliki w `public/` będą dostępne w root path
   - `public/images/logo.webp` → `https://yourdomain.com/images/logo.webp`

2. **API Routes**:
   - Route `/api/newsletter` używa Edge Runtime
   - Cloudflare automatycznie obsługuje Next.js API routes

3. **Images**:
   - Ustawiono `unoptimized: true` bo Cloudflare Pages nie wspiera Next.js Image Optimization
   - Obrazy są serwowane bezpośrednio z `public/images/`

## Troubleshooting 404s

Jeśli widzisz błędy 404 dla plików statycznych:

1. Sprawdź czy w Cloudflare Pages build output jest ustawiony na `.next`
2. Sprawdź czy pliki są w folderze `public/`
3. Zweryfikuj logi buildu w Cloudflare Pages
4. Upewnij się że Framework preset = "Next.js" (nie "Next.js (Static HTML Export)")

## Redeploy

Po każdym pushu do `main` branch, Cloudflare Pages automatycznie zrobi rebuild.
