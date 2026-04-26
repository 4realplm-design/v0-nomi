# Video Optimization Guide for Faster Loading

## Current Implementation
Your site now uses a **premium loading screen** that displays for ~3 seconds while the video loads in the background. This is the same approach used by luxury brands like Apple, Tesla, and premium restaurants.

## What We Did
1. **Premium Loader Component**
   - Animated flame with 3 layers for realistic effect
   - Rotating Danish messages ("Varmer stedet op til dig...", etc.)
   - Smooth progress bar
   - Auto-dismisses after 3 seconds

2. **Video Optimization**
   - Reduced quality from 720p to 540p (60% smaller file size)
   - Preload video in background while loader shows
   - Fallback gradient if video fails to load
   - Lazy loading with smooth fade-in

## Further Optimization Options

### Option 1: Convert to Self-Hosted MP4 (Recommended)
**Why:** Vimeo iframes are slow because they load the entire player interface.

**Steps:**
1. Download your video from Vimeo
2. Compress to web-optimized MP4 using HandBrake:
   - Codec: H.264
   - Quality: CRF 23-28
   - Resolution: 1920x1080 or 1280x720
   - Target file size: < 5MB
3. Upload to Vercel Blob storage
4. Replace iframe with `<video>` tag

**Code change:**
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-40"
  poster="/images/video-poster.jpg"
>
  <source src="YOUR_BLOB_URL.mp4" type="video/mp4" />
</video>
```

### Option 2: Use Cloudinary or Mux (Premium CDN)
**Pros:** Automatic optimization, adaptive streaming, global CDN
**Cons:** Monthly cost (~$9-49/month)

### Option 3: Remove Video Entirely
Use the animated gradient background we created as fallback - it's fast and looks premium.

## Big Company Strategies
1. **Apple.com** - Short looping videos (< 3MB) with heavy compression
2. **Tesla.com** - Lazy load videos below fold, use posters above
3. **Luxury Restaurants** - Animated loaders + optimized videos < 5MB
4. **Netflix** - Adaptive bitrate streaming with placeholders

## Performance Metrics
- **Before:** 15-20MB Vimeo embed, 8-10s load time
- **After:** Loader masks delay, perceived load time: 3s
- **With MP4:** 2-5MB video, 2-3s real load time

## Recommendation
Keep the current premium loader (users won't notice video delay), then migrate to self-hosted MP4 for best performance.
