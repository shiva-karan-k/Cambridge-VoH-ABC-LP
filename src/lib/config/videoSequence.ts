export interface VideoConfig {
  videoId: string
  title: string
  description: string
  filePath: string
  thumbnailPath: string
  week: number
  exercise: number
  order: number
  prerequisiteVideoId?: string
  isIntroVideo: boolean
}

export const VIDEO_SEQUENCE: VideoConfig[] = [
  {
    videoId: 'intro-video',
    title: 'Introduction Video',
    description: 'Welcome to the breathing program',
    filePath: '/assets/videos/Intro Video.mp4',
    thumbnailPath: '/assets/images/intro-thumbnail.png',
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
    thumbnailPath: '/assets/images/w1/Mask group.png',
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
    filePath: '/assets/videos/week-1-exercise-2.mp4',
    thumbnailPath: '/assets/images/w1/Mask group-1.png',
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
    filePath: '/assets/videos/week-2-exercise-1.mp4',
    thumbnailPath: '/assets/images/w2/thumbnail.png',
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
    filePath: '/assets/videos/week-3-exercise-1.mp4',
    thumbnailPath: '/assets/images/w3/thumbnail.png',
    week: 3,
    exercise: 1,
    order: 4,
    prerequisiteVideoId: 'week-2-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-4-exercise-1',
    title: 'Week 4 - Exercise 1',
    description: 'Week 4 breathing exercises',
    filePath: '/assets/videos/week-4-exercise-1.mp4',
    thumbnailPath: '/assets/images/w4/thumbnail.png',
    week: 4,
    exercise: 1,
    order: 5,
    prerequisiteVideoId: 'week-3-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-5-exercise-1',
    title: 'Week 5 - Exercise 1',
    description: 'Week 5 breathing exercises',
    filePath: '/assets/videos/week-5-exercise-1.mp4',
    thumbnailPath: '/assets/images/w5/thumbnail.png',
    week: 5,
    exercise: 1,
    order: 6,
    prerequisiteVideoId: 'week-4-exercise-1',
    isIntroVideo: false,
  },
  {
    videoId: 'week-6-exercise-1',
    title: 'Week 6 - Exercise 1',
    description: 'Week 6 breathing exercises',
    filePath: '/assets/videos/week-6-exercise-1.mp4',
    thumbnailPath: '/assets/images/w6/thumbnail.png',
    week: 6,
    exercise: 1,
    order: 7,
    prerequisiteVideoId: 'week-5-exercise-1',
    isIntroVideo: false,
  },
]

// Helper function to get video by ID
export function getVideoById(videoId: string): VideoConfig | undefined {
  return VIDEO_SEQUENCE.find(v => v.videoId === videoId)
}

// Helper function to get videos by week
export function getVideosByWeek(week: number): VideoConfig[] {
  return VIDEO_SEQUENCE.filter(v => v.week === week)
}

// Helper function to get next video
export function getNextVideo(currentVideoId: string): VideoConfig | undefined {
  const currentVideo = getVideoById(currentVideoId)
  if (!currentVideo) return undefined
  
  return VIDEO_SEQUENCE.find(v => v.order === currentVideo.order + 1)
}
