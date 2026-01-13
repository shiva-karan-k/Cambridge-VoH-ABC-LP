import { useState, useEffect } from 'react'

interface VideoUnlockStatus {
  videoId: string
  isUnlocked: boolean
}

interface UseVideoUnlockReturn {
  isUnlocked: boolean
  isLoading: boolean
  error: string | null
  checkUnlockStatus: () => Promise<void>
}

export function useVideoUnlock(videoId: string): UseVideoUnlockReturn {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkUnlockStatus = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/videos/unlock-status?videoId=${videoId}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to check unlock status')
      }

      setIsUnlocked(data.data.isUnlocked)
    } catch (err) {
      console.error('Error checking unlock status:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setIsUnlocked(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkUnlockStatus()
  }, [videoId])

  return {
    isUnlocked,
    isLoading,
    error,
    checkUnlockStatus,
  }
}
