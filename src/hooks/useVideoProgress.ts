import { useState, useEffect, useCallback } from 'react'

interface VideoProgressData {
  userId: string
  videoId: string
  currentTime: number
  duration: number
  completed: boolean
  completedAt?: Date
  lastWatched: Date
}

interface UseVideoProgressReturn {
  progress: VideoProgressData | null
  isLoading: boolean
  error: string | null
  updateProgress: (currentTime: number, duration: number) => Promise<void>
  markCompleted: () => Promise<void>
  resetProgress: () => Promise<void>
}

export function useVideoProgress(videoId: string): UseVideoProgressReturn {
  const [progress, setProgress] = useState<VideoProgressData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch initial progress
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/progress')
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch progress')
        }

        // Find progress for this specific video
        const videoProgress = data.data.find((p: VideoProgressData) => p.videoId === videoId)
        setProgress(videoProgress || null)
      } catch (err) {
        console.error('Error fetching progress:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [videoId])

  // Update progress
  const updateProgress = useCallback(
    async (currentTime: number, duration: number) => {
      try {
        const response = await fetch('/api/progress/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoId,
            currentTime,
            duration,
          }),
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error?.message || 'Failed to update progress')
        }

        setProgress(data.data)
      } catch (err) {
        console.error('Error updating progress:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    },
    [videoId]
  )

  // Mark as completed
  const markCompleted = useCallback(async () => {
    try {
      const response = await fetch('/api/progress/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to mark as completed')
      }

      setProgress(data.data)
    } catch (err) {
      console.error('Error marking as completed:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [videoId])

  // Reset progress
  const resetProgress = useCallback(async () => {
    try {
      const response = await fetch(`/api/progress/reset?videoId=${videoId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to reset progress')
      }

      setProgress(null)
    } catch (err) {
      console.error('Error resetting progress:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [videoId])

  return {
    progress,
    isLoading,
    error,
    updateProgress,
    markCompleted,
    resetProgress,
  }
}
