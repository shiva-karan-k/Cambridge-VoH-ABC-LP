'use client'

import { useEffect, useState } from 'react'

interface ProgressIndicatorProps {
  totalVideos: number
  className?: string
}

export default function ProgressIndicator({ totalVideos, className = '' }: ProgressIndicatorProps) {
  const [completedCount, setCompletedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress')
        const data = await response.json()

        if (data.success) {
          const completed = data.data.filter((p: any) => p.completed).length
          setCompletedCount(completed)
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [])

  const progressPercentage = totalVideos > 0 ? (completedCount / totalVideos) * 100 : 0

  if (isLoading) {
    return (
      <div className={`progress-indicator loading ${className}`}>
        <div className="progress-skeleton"></div>
        <style jsx>{`
          .progress-indicator.loading {
            padding: 16px;
          }
          .progress-skeleton {
            height: 24px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 4px;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`progress-indicator ${className}`}>
      <div className="progress-header">
        <h3 className="progress-title">Your Progress</h3>
        <span className="progress-count">
          {completedCount} / {totalVideos} completed
        </span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <style jsx>{`
        .progress-indicator {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .progress-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        .progress-count {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        .progress-bar-container {
          width: 100%;
          height: 12px;
          background: #e0e0e0;
          border-radius: 6px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #66BB6A);
          border-radius: 6px;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  )
}
