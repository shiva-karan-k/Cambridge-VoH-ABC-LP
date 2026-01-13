import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import { ProgressService } from '@/lib/services/progressService'

// POST /api/admin/videos/unlock - Manually unlock video for user (admin only)
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

    if (!targetUserId || !videoId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Missing required fields: targetUserId, videoId',
          },
        },
        { status: 400 }
      )
    }

    // Mark the video as completed to unlock the next one
    const progress = await ProgressService.markCompleted(targetUserId, videoId)

    return NextResponse.json({
      success: true,
      message: `Video ${videoId} unlocked for user ${targetUserId}`,
      data: progress,
    })
  } catch (error) {
    console.error('Error unlocking video:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNLOCK_ERROR',
          message: 'Failed to unlock video',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
