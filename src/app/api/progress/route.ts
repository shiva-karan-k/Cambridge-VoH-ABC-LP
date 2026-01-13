import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { ProgressService } from '@/lib/services/progressService'

// GET /api/progress - Get user's complete progress
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const progress = await ProgressService.getUserProgress(userId)

    return NextResponse.json({
      success: true,
      data: progress,
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch progress',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
