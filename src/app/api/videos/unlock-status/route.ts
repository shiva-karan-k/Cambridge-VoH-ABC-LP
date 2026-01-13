import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { VideoService } from '@/lib/services/videoService'

// GET /api/videos/unlock-status?videoId=xxx - Check if video is unlocked
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Missing required parameter: videoId',
          },
        },
        { status: 400 }
      )
    }

    const isUnlocked = await VideoService.isVideoUnlocked(userId, videoId)

    return NextResponse.json({
      success: true,
      data: {
        videoId,
        isUnlocked,
      },
    })
  } catch (error) {
    console.error('Error checking unlock status:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CHECK_ERROR',
          message: 'Failed to check unlock status',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
