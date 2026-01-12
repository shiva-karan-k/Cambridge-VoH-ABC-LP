import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createAdminUser, isAdmin } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if current user is already an admin (for creating additional admins)
    const currentUserIsAdmin = await isAdmin()
    
    const body = await request.json()
    const { clerkUserId, email, name, role = 'admin' } = body

    // If no admins exist yet, allow creation of first admin
    // Otherwise, only existing admins can create new admins
    if (currentUserIsAdmin || await isFirstAdmin()) {
      const adminUser = await createAdminUser({
        clerkUserId,
        email,
        name,
        role
      })

      return NextResponse.json({ 
        success: true, 
        admin: {
          id: adminUser._id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role
        }
      })
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function isFirstAdmin(): Promise<boolean> {
  try {
    const connectDB = (await import('@/lib/mongodb')).default
    const AdminUser = (await import('@/models/AdminUser')).default
    
    await connectDB()
    const adminCount = await AdminUser.countDocuments({ isActive: true })
    return adminCount === 0
  } catch (error) {
    console.error('Error checking admin count:', error)
    return false
  }
}