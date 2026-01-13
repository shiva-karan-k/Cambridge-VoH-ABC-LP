import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { ProgressService } from '@/lib/services/progressService'

// POST /api/progress/complete - Mark video as completed
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { videoId } = body

    // Validate input
    if (!videoId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Missing required field: videoId',
          },
        },
        { status: 400 }
      )
    }

    const progress = await ProgressService.markCompleted(userId, videoId)

    return NextResponse.json({
      success: true,
      data: progress,
      message: 'Video marked as completed',
    })
  } catch (error) {
    console.error('Error marking video as completed:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'COMPLETE_ERROR',
          message: 'Failed to mark video as completed',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
