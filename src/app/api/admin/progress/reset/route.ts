import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import { ProgressService } from '@/lib/services/progressService'

// POST /api/admin/progress/reset - Reset user progress (admin only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    await connectDB()
    const adminUser = await AdminUser.findOne({ clerkUserId: userId, isActive: true })

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { targetUserId, videoId } = body

    if (!targetUserId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Missing required field: targetUserId',
          },
        },
        { status: 400 }
      )
    }

    await ProgressService.resetProgress(targetUserId, videoId)

    return NextResponse.json({
      success: true,
      message: videoId
        ? `Progress reset for user ${targetUserId}, video ${videoId}`
        : `All progress reset for user ${targetUserId}`,
    })
  } catch (error) {
    console.error('Error resetting user progress:', error)
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
