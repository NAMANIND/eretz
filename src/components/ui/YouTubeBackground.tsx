"use client";

import React, { useState, useEffect, useRef } from "react";

interface YouTubeBackgroundProps {
  videoId: string;
  className?: string;
  startTime?: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({
  videoId,
  className = "",
  startTime = 0,
  autoplay = true,
  muted = true,
  loop = true,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getYouTubeUrl = (): string => {
    const baseUrl = "https://www.youtube.com/embed/";
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: videoId,
      controls: "0",
      showinfo: "0",
      rel: "0",
      iv_load_policy: "3",
      modestbranding: "1",
      playsinline: "1",
      start: startTime.toString(),
      enablejsapi: "1",
      origin: typeof window !== "undefined" ? window.location.origin : "",
      vq: "hd1080",
    });

    return `${baseUrl}${videoId}?${params.toString()}`;
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
    >
      <iframe
        ref={iframeRef}
        src={getYouTubeUrl()}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "100vw",
          height: "56.25vw", // 16:9 aspect ratio based on viewport width
          minHeight: "100vh",
          minWidth: "177.78vh", // 16:9 aspect ratio based on viewport height
          objectFit: "cover",
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        loading="eager"
        tabIndex={-1}
        aria-hidden="true"
        role="presentation"
        title="YouTube Video Background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

export default YouTubeBackground;
