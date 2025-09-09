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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const getYouTubeUrl = (): string => {
    const baseUrl = "https://www.youtube.com/embed/";
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      mute: muted ? "1" : "0",
      loop: loop ? "1" : "0",
      playlist: loop ? videoId : "",
      controls: "0",
      showinfo: "0",
      rel: "0",
      iv_load_policy: "3",
      modestbranding: "1",
      playsinline: "1",
      start: startTime.toString(),
      enablejsapi: "1",
      origin:
        isMounted && typeof window !== "undefined"
          ? window.location.origin
          : "",
      vq: "hd1080",
    });

    return `${baseUrl}${videoId}?${params.toString()}`;
  };

  if (!isMounted) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={getYouTubeUrl()}
        className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          objectFit: "cover",
          background: "#000",
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        loading="eager"
        tabIndex={-1}
        title="YouTube Video Background"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

export default YouTubeBackground;
