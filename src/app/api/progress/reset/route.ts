import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { ProgressService } from '@/lib/services/progressService'

// DELETE /api/progress/reset - Reset user progress
export async function DELETE(request: NextRequest) {
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

    await ProgressService.resetProgress(userId, videoId || undefined)

    return NextResponse.json({
      success: true,
      message: videoId
        ? `Progress reset for video: ${videoId}`
        : 'All progress reset',
    })
  } catch (error) {
    console.error('Error resetting progress:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RESET_ERROR',
          message: 'Failed to reset progress',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
