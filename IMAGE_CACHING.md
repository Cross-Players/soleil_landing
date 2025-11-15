# Image Caching Guide

This project includes comprehensive image caching solutions for optimal performance.

## Libraries Installed

### 1. **Sharp** (v0.34.5)
- High-performance image processing library
- Used by Next.js for image optimization
- Automatically handles AVIF and WebP conversion

## Caching Configuration

### Server-Side Caching (next.config.ts)

1. **Image Optimization Cache**: 1 year (31536000 seconds)
   - All optimized images are cached for maximum performance
   - Located in `/_next/image` route

2. **Static Image Cache**: 1 year
   - All images in `/images/` directory
   - Immutable cache headers for optimal browser caching

3. **ETags**: Enabled for better cache validation

## Usage Examples

### Option 1: Use Standard Next.js Image (Recommended)

```tsx
import Image from 'next/image';

// Standard usage - already optimized and cached
<Image
  src="/images/home/banner-1.jpg"
  alt="Banner"
  width={1200}
  height={630}
  priority // For above-the-fold images
/>
```

### Option 2: Use CachedImage Component

```tsx
import CachedImage from '@/components/shared/CachedImage';

// With preloading
<CachedImage
  src="/images/home/banner-1.jpg"
  alt="Banner"
  width={1200}
  height={630}
  preload={true}
  priority={true}
/>
```

### Option 3: Manual Preloading

```tsx
import { preloadImage, preloadImages } from '@/lib/imageCache';
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Preload a single image
    preloadImage('/images/home/banner-1.jpg', { 
      priority: true,
      fetchPriority: 'high' 
    });

    // Preload multiple images
    preloadImages([
      '/images/home/banner-1.jpg',
      '/images/home/banner-2.jpg',
      '/images/home/banner-3.jpg',
    ], { priority: true });
  }, []);

  return <div>...</div>;
}
```

### Option 4: Check if Image is Cached

```tsx
import { isImageCached } from '@/lib/imageCache';

async function checkCache() {
  const cached = await isImageCached('/images/home/banner-1.jpg');
  console.log('Image cached:', cached);
}
```

## Best Practices

1. **Use `priority` prop** for above-the-fold images
2. **Preload critical images** that appear on initial view
3. **Use appropriate `sizes` prop** for responsive images
4. **Lazy load** images below the fold (default behavior)
5. **Use WebP/AVIF formats** (automatically handled by Next.js)

## Cache Headers

- **Static images**: `Cache-Control: public, max-age=31536000, immutable`
- **Optimized images**: `Cache-Control: public, max-age=31536000, immutable`
- **ETags**: Enabled for cache validation

## Performance Benefits

- ✅ Reduced server load
- ✅ Faster page loads
- ✅ Better Core Web Vitals scores
- ✅ Improved SEO rankings
- ✅ Lower bandwidth usage
- ✅ Better user experience

## Monitoring

Check browser DevTools Network tab to verify:
- Images are served from cache (Status: 200 (from disk cache))
- Cache-Control headers are present
- Images are optimized (WebP/AVIF format)

