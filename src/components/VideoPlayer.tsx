'use client'

import { useRef, useEffect, useState } from 'react'
import { useVideoProgress } from '@/hooks/useVideoProgress'

interface VideoPlayerProps {
  videoId: string
  videoSrc: string
  thumbnailSrc?: string
  isLocked?: boolean
  onUnlock?: () => void
  className?: string
}

export default function VideoPlayer({
  videoId,
  videoSrc,
  thumbnailSrc,
  isLocked = false,
  onUnlock,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    progress,
    isLoading,
    error,
    updateProgress,
    markCompleted,
  } = useVideoProgress(videoId)

  // Resume from last position when video loads
  useEffect(() => {
    if (videoRef.current && progress && progress.currentTime > 0) {
      videoRef.current.currentTime = progress.currentTime
    }
  }, [progress])

  // Track progress every 10 seconds
  useEffect(() => {
    if (!videoRef.current || isLocked) return

    const video = videoRef.current
    let progressInterval: NodeJS.Timeout

    const handlePlay = () => {
      setIsPlaying(true)
      progressInterval = setInterval(() => {
        if (video.currentTime && video.duration) {
          updateProgress(video.currentTime, video.duration)
        }
      }, 10000) // Update every 10 seconds
    }

    const handlePause = () => {
      setIsPlaying(false)
      clearInterval(progressInterval)
      // Save progress on pause
      if (video.currentTime && video.duration) {
        updateProgress(video.currentTime, video.duration)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      clearInterval(progressInterval)
      // Mark as completed
      if (video.duration) {
        markCompleted()
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      clearInterval(progressInterval)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoId, isLocked, updateProgress, markCompleted])

  if (isLocked) {
    return (
      <div className={`video-player-container locked ${className}`}>
        <div className="video-thumbnail-wrapper">
          {thumbnailSrc && (
            <img
              src={thumbnailSrc}
              alt="Locked video"
              className="video-thumbnail-img locked"
            />
          )}
          <div className="lock-overlay">
            <div className="lock-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="lock-message">Complete the previous video to unlock</p>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .video-player-container.locked {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }
          .video-thumbnail-wrapper {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            background: #000;
            border-radius: 8px;
            overflow: hidden;
          }
          .video-thumbnail-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: blur(4px) brightness(0.5);
          }
          .lock-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10;
          }
          .lock-icon {
            color: #fff;
            margin-bottom: 16px;
          }
          .lock-message {
            color: #fff;
            font-size: 16px;
            text-align: center;
            margin: 0;
          }
        `}} />
      </div>
    )
  }

  return (
    <div className={`video-player-container ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        controls={showControls}
        className="video-player"
        preload="metadata"
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      {progress && progress.completed && (
        <div className="completion-badge">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#4CAF50" />
            <path
              d="M9 12l2 2 4-4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Completed</span>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>Error loading video progress. Please try again.</p>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        .video-player-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        .video-player {
          width: 100%;
          border-radius: 8px;
          background: #000;
        }
        .completion-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(76, 175, 80, 0.9);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .error-message {
          margin-top: 8px;
          padding: 12px;
          background: #ffebee;
          color: #c62828;
          border-radius: 4px;
          font-size: 14px;
        }
      `}} />
    </div>
  )
}
