import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { VideoService } from '@/lib/services/videoService'

// GET /api/videos/available - Get unlocked videos for user
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const availableVideos = await VideoService.getAvailableVideos(userId)

    return NextResponse.json({
      success: true,
      data: availableVideos,
    })
  } catch (error) {
    console.error('Error fetching available videos:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch available videos',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
