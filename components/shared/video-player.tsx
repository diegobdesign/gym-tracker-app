'use client'

interface VideoPlayerProps {
  url: string
  title?: string
}

function getVideoEmbedUrl(url: string): { type: 'youtube' | 'vimeo' | 'direct'; embedUrl: string } | null {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }
  }

  // Direct video URL (mp4, webm, ogg)
  if (/\.(mp4|webm|ogg)$/i.test(url)) {
    return {
      type: 'direct',
      embedUrl: url
    }
  }

  return null
}

export function VideoPlayer({ url, title = 'Exercise Video' }: VideoPlayerProps) {
  const videoData = getVideoEmbedUrl(url)

  if (!videoData) {
    // Fallback to link if we can't parse the URL
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Watch Video
      </a>
    )
  }

  if (videoData.type === 'direct') {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-black">
        <video
          controls
          className="h-full w-full"
          preload="metadata"
        >
          <source src={videoData.embedUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  // YouTube or Vimeo
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
      <iframe
        src={videoData.embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  )
}
