import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import { VideoService } from '@/lib/services/videoService'

// POST /api/videos/init - Initialize video metadata (admin only)
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

    // Initialize video metadata
    await VideoService.initializeVideoMetadata()

    return NextResponse.json({
      success: true,
      message: 'Video metadata initialized successfully',
    })
  } catch (error) {
    console.error('Error initializing video metadata:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INIT_ERROR',
          message: 'Failed to initialize video metadata',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
