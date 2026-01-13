import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import VideoProgress from '@/models/VideoProgress'

// GET /api/admin/progress - Get all users' progress (admin only)
export async function GET(request: NextRequest) {
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

    // Get all progress records
    const allProgress = await VideoProgress.find().sort({ lastWatched: -1 })

    // Group by userId
    const progressByUser: Record<string, any[]> = {}
    allProgress.forEach(progress => {
      if (!progressByUser[progress.userId]) {
        progressByUser[progress.userId] = []
      }
      progressByUser[progress.userId].push(progress.toObject())
    })

    return NextResponse.json({
      success: true,
      data: progressByUser,
    })
  } catch (error) {
    console.error('Error fetching all progress:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch progress data',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
