import connectDB from '../mongodb'
import VideoMetadata from '@/models/VideoMetadata'
import { ProgressService } from './progressService'

export interface VideoMetadataData {
  videoId: string
  title: string
  description: string
  filePath: string
  week: number
  exercise: number
  order: number
  prerequisiteVideoId?: string
  isIntroVideo: boolean
}

// Video sequence configuration
export const VIDEO_SEQUENCE: VideoMetadataData[] = [
  {
    videoId: 'intro-video',
    title: 'Introduction Video',
    description: 'Welcome to the breathing program',
    filePath: '/assets/videos/Intro Video.mp4',
    week: 0,
    exercise: 0,
    order: 0,
    isIntroVideo: true,
  },
  {
    videoId: 'week-1-exercise-1',
    title: 'Week 1 - Exercise 1: Belly Breathing',
    description: 'Learn how to do Belly Breathing',
    filePath: '/assets/videos/Session 1 - excercise 1, part 2 final.mp4',
    week: 1,
    exercise: 1,
    order: 1,
    prerequisiteVideoId: 'intro-video',
    isIntroVideo: false,
  },
  {
    videoId: 'week-1-exercise-2',
    title: 'Week 1 - Exercise 2: Pursed Lip Breathing',
    description: 'Practice blowing through your lips',
    filePath: '/assets/videos/Session 1 - excercise 2 final.mp4',
    week: 1,
    exercise: 2,
    order: 2,
    prerequisiteVideoId: 'week-1-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-2-exercise-1',
    title: 'Week 2 - Exercise 1',
    description: 'Week 2 breathing exercises',
    filePath: '/assets/videos/session 2 - excercise 4 final.mp4',
    week: 2,
    exercise: 1,
    order: 3,
    prerequisiteVideoId: 'week-1-exercise-2',
    isIntroVideo: false,
  },
  {
    videoId: 'week-3-exercise-1',
    title: 'Week 3 - Exercise 1',
    description: 'Week 3 breathing exercises',
    filePath: '/assets/videos/Session 3 - excercise 8 final.mp4',
    week: 3,
    exercise: 1,
    order: 4,
    prerequisiteVideoId: 'week-2-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-3-exercise-2',
    title: 'Week 3 - Exercise 2',
    description: 'Week 3 second exercise',
    filePath: '/assets/videos/session 3 - excercise 9 final.mp4',
    week: 3,
    exercise: 2,
    order: 5,
    prerequisiteVideoId: 'week-3-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-4-exercise-1',
    title: 'Week 4 - Exercise 1',
    description: 'Week 4 breathing exercises',
    filePath: '/assets/videos/Session 4 - excercise 12 final.mp4',
    week: 4,
    exercise: 1,
    order: 6,
    prerequisiteVideoId: 'week-3-exercise-2',
    isIntroVideo: false,
  },
  {
    videoId: 'week-5-exercise-1',
    title: 'Week 5 - Exercise 1',
    description: 'Week 5 breathing exercises',
    filePath: '/assets/videos/session 5 - excercise 15 final.mp4',
    week: 5,
    exercise: 1,
    order: 7,
    prerequisiteVideoId: 'week-4-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-5-exercise-2',
    title: 'Week 5 - Exercise 2',
    description: 'Week 5 second exercise',
    filePath: '/assets/videos/session 5 - excercise 16 final.mp4',
    week: 5,
    exercise: 2,
    order: 8,
    prerequisiteVideoId: 'week-5-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-6-exercise-1',
    title: 'Week 6 - Exercise 1',
    description: 'Week 6 breathing exercises',
    filePath: '/assets/videos/Sesssion 6 - excercise 19 final.mp4',
    week: 6,
    exercise: 1,
    order: 9,
    prerequisiteVideoId: 'week-5-exercise-2',
    isIntroVideo: false,
  },
]

export class VideoService {
  /**
   * Initialize video metadata in database
   * Should be called once to seed the database
   */
  static async initializeVideoMetadata(): Promise<void> {
    await connectDB()

    for (const video of VIDEO_SEQUENCE) {
      await VideoMetadata.findOneAndUpdate(
        { videoId: video.videoId },
        video,
        { upsert: true, new: true }
      )
    }
  }

  /**
   * Get metadata for a specific video
   */
  static async getVideoMetadata(videoId: string): Promise<VideoMetadataData | null> {
    await connectDB()

    const metadata = await VideoMetadata.findOne({ videoId })
    return metadata ? metadata.toObject() : null
  }

  /**
   * Get all videos in sequence order
   */
  static async getVideoSequence(): Promise<VideoMetadataData[]> {
    await connectDB()

    const videos = await VideoMetadata.find().sort({ order: 1 })
    return videos.map(v => v.toObject())
  }

  /**
   * Check if a video is unlocked for a user
   * A video is unlocked if:
   * 1. It's the intro video, OR
   * 2. Its prerequisite video has been completed
   */
  static async isVideoUnlocked(userId: string, videoId: string): Promise<boolean> {
    await connectDB()

    const video = await VideoMetadata.findOne({ videoId })
    if (!video) {
      return false
    }

    // Intro video is always unlocked
    if (video.isIntroVideo) {
      return true
    }

    // Check if prerequisite is completed
    if (video.prerequisiteVideoId) {
      const isPrerequisiteCompleted = await ProgressService.isVideoCompleted(
        userId,
        video.prerequisiteVideoId
      )
      return isPrerequisiteCompleted
    }

    // No prerequisite means it's unlocked
    return true
  }

  /**
   * Get all available (unlocked) videos for a user
   */
  static async getAvailableVideos(userId: string): Promise<VideoMetadataData[]> {
    await connectDB()

    const allVideos = await this.getVideoSequence()
    const availableVideos: VideoMetadataData[] = []

    for (const video of allVideos) {
      const isUnlocked = await this.isVideoUnlocked(userId, video.videoId)
      if (isUnlocked) {
        availableVideos.push(video)
      }
    }

    return availableVideos
  }

  /**
   * Get the next video to unlock for a user
   */
  static async getNextVideo(userId: string): Promise<VideoMetadataData | null> {
    await connectDB()

    const allVideos = await this.getVideoSequence()

    for (const video of allVideos) {
      const isUnlocked = await this.isVideoUnlocked(userId, video.videoId)
      const isCompleted = await ProgressService.isVideoCompleted(userId, video.videoId)

      // Return the first video that is unlocked but not completed
      if (isUnlocked && !isCompleted) {
        return video
      }
    }

    return null // All videos completed
  }

  /**
   * Get videos for a specific week
   */
  static async getWeekVideos(week: number): Promise<VideoMetadataData[]> {
    await connectDB()

    const videos = await VideoMetadata.find({ week }).sort({ exercise: 1 })
    return videos.map(v => v.toObject())
  }
}
