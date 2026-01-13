import connectDB from '../mongodb'
import VideoProgress from '@/models/VideoProgress'

export interface VideoProgressData {
  userId: string
  videoId: string
  currentTime: number
  duration: number
  completed: boolean
  completedAt?: Date
  lastWatched: Date
}

export class ProgressService {
  /**
   * Update video progress for a user
   * Automatically marks as completed if currentTime >= 90% of duration
   */
  static async updateProgress(
    userId: string,
    videoId: string,
    currentTime: number,
    duration: number
  ): Promise<VideoProgressData> {
    await connectDB()

    // Calculate if video should be marked as completed (90% threshold)
    const completionThreshold = duration * 0.9
    const isCompleted = currentTime >= completionThreshold

    const updateData: any = {
      currentTime,
      duration,
      lastWatched: new Date(),
    }

    // If completing for the first time, set completedAt
    if (isCompleted) {
      updateData.completed = true
      updateData.completedAt = new Date()
    }

    const progress = await VideoProgress.findOneAndUpdate(
      { userId, videoId },
      updateData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    return progress.toObject()
  }

  /**
   * Get progress for a specific video and user
   */
  static async getProgress(
    userId: string,
    videoId: string
  ): Promise<VideoProgressData | null> {
    await connectDB()

    const progress = await VideoProgress.findOne({ userId, videoId })
    return progress ? progress.toObject() : null
  }

  /**
   * Get all progress for a user
   */
  static async getUserProgress(userId: string): Promise<VideoProgressData[]> {
    await connectDB()

    const progressList = await VideoProgress.find({ userId }).sort({ lastWatched: -1 })
    return progressList.map(p => p.toObject())
  }

  /**
   * Mark a video as completed manually
   */
  static async markCompleted(userId: string, videoId: string): Promise<VideoProgressData> {
    await connectDB()

    const progress = await VideoProgress.findOneAndUpdate(
      { userId, videoId },
      {
        completed: true,
        completedAt: new Date(),
        lastWatched: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    return progress.toObject()
  }

  /**
   * Reset progress for a user
   * If videoId is provided, resets only that video
   * Otherwise, resets all progress for the user
   */
  static async resetProgress(userId: string, videoId?: string): Promise<void> {
    await connectDB()

    if (videoId) {
      await VideoProgress.deleteOne({ userId, videoId })
    } else {
      await VideoProgress.deleteMany({ userId })
    }
  }

  /**
   * Get completion status for a specific video
   */
  static async isVideoCompleted(userId: string, videoId: string): Promise<boolean> {
    await connectDB()

    const progress = await VideoProgress.findOne({ userId, videoId, completed: true })
    return !!progress
  }

  /**
   * Get all completed videos for a user
   */
  static async getCompletedVideos(userId: string): Promise<string[]> {
    await connectDB()

    const completedProgress = await VideoProgress.find({ userId, completed: true })
    return completedProgress.map(p => p.videoId)
  }
}
