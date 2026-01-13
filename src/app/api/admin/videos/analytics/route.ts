import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import VideoProgress from '@/models/VideoProgress'
import { VideoService } from '@/lib/services/videoService'

// GET /api/admin/videos/analytics - Get completion analytics (admin only)
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

    // Get all videos
    const allVideos = await VideoService.getVideoSequence()

    // Get completion stats for each video
    const analytics = await Promise.all(
      allVideos.map(async (video) => {
        const totalProgress = await VideoProgress.countDocuments({ videoId: video.videoId })
        const completedProgress = await VideoProgress.countDocuments({
          videoId: video.videoId,
          completed: true,
        })

        const completionRate = totalProgress > 0 ? (completedProgress / totalProgress) * 100 : 0

        return {
          videoId: video.videoId,
          title: video.title,
          week: video.week,
          exercise: video.exercise,
          totalViews: totalProgress,
          completedViews: completedProgress,
          completionRate: Math.round(completionRate * 100) / 100,
        }
      })
    )

    // Get overall stats
    const totalUsers = await VideoProgress.distinct('userId')
    const totalProgressRecords = await VideoProgress.countDocuments()
    const totalCompletedRecords = await VideoProgress.countDocuments({ completed: true })

    return NextResponse.json({
      success: true,
      data: {
        overall: {
          totalUsers: totalUsers.length,
          totalProgressRecords,
          totalCompletedRecords,
          overallCompletionRate:
            totalProgressRecords > 0
              ? Math.round((totalCompletedRecords / totalProgressRecords) * 100 * 100) / 100
              : 0,
        },
        byVideo: analytics,
      },
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch analytics',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
