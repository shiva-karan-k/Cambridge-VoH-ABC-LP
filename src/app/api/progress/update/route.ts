import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { ProgressService } from '@/lib/services/progressService'

// POST /api/progress/update - Update video progress
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
    const { videoId, currentTime, duration } = body

    // Validate input
    if (!videoId || typeof currentTime !== 'number' || typeof duration !== 'number') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Missing or invalid required fields: videoId, currentTime, duration',
          },
        },
        { status: 400 }
      )
    }

    if (currentTime < 0 || duration <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'currentTime must be >= 0 and duration must be > 0',
          },
        },
        { status: 400 }
      )
    }

    const progress = await ProgressService.updateProgress(
      userId,
      videoId,
      currentTime,
      duration
    )

    return NextResponse.json({
      success: true,
      data: progress,
    })
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: 'Failed to update progress',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
