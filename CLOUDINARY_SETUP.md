# Cloudinary Video Setup Guide

## 1. Add Environment Variable

Add this to your Vercel project environment variables (or `.env.local` for development):

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlt6bojfp
```

The `next-cloudinary` package is already installed and will automatically use this environment variable.

## 2. Upload Your Video to Cloudinary

1. Go to https://console.cloudinary.com/
2. Log in with your credentials:
   - Cloud name: `dlt6bojfp`
   - API Key: `872848294365738`
   - API Secret: `ycI1snIALT8B08kO...`

3. Navigate to **Media Library** → **Upload**
4. Upload your restaurant video
5. After upload, note the **Public ID** (e.g., "nomi-hero-video")

## 3. Update the Hero Component

In `components/hero.tsx`, replace `"nomi-hero-video"` with your actual video Public ID:

```tsx
<CldVideoPlayer
  src="your-actual-public-id-here"
  ...
/>
```

## 4. Video Optimization Tips

Cloudinary automatically optimizes your video for web delivery:
- Adaptive bitrate streaming
- Format optimization (WebM, MP4)
- Lazy loading
- Responsive sizing

## 5. Optional: Video Transformations

You can add transformations to the video:

```tsx
<CldVideoPlayer
  src="nomi-hero-video"
  transformation={{
    quality: "auto",
    fetchFormat: "auto",
    crop: "fill",
    gravity: "center"
  }}
  ...
/>
```

## Current Setup

The hero component is configured to:
- Autoplay on load
- Loop continuously
- Muted (required for autoplay)
- No controls visible
- 40% opacity for better text readability
- Background blur overlay
