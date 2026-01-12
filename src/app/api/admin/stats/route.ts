import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import Enrollment from '@/models/Enrollment'
import Contact from '@/models/Contact'
import Donation from '@/models/Donation'

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    // Get current date for time-based queries
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

    // Get enrollment stats
    const [
      totalEnrollments,
      enrollments30Days,
      enrollments60Days,
      enrollments90Days,
      totalContacts,
      totalDonations,
      recentEnrollments
    ] = await Promise.all([
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Enrollment.countDocuments({ createdAt: { $gte: sixtyDaysAgo } }),
      Enrollment.countDocuments({ createdAt: { $gte: ninetyDaysAgo } }),
      Contact.countDocuments(),
      Donation.countDocuments(),
      Enrollment.find().sort({ createdAt: -1 }).limit(10)
    ])

    const stats = {
      enrollments: {
        total: totalEnrollments,
        last30Days: enrollments30Days,
        last60Days: enrollments60Days,
        last90Days: enrollments90Days,
      },
      contacts: {
        total: totalContacts,
      },
      donations: {
        total: totalDonations,
      },
      recent: {
        enrollments: recentEnrollments,
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}