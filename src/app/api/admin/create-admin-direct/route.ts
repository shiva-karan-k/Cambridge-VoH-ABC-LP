import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clerkUserId, email, name, role = 'admin' } = body

    if (!clerkUserId || !email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()
    
    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ 
      $or: [
        { clerkUserId },
        { email }
      ]
    })
    
    if (existingAdmin) {
      return NextResponse.json({ 
        success: true,
        message: 'Admin already exists',
        admin: {
          id: existingAdmin._id,
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        }
      })
    }

    // Create new admin
    const adminUser = new AdminUser({
      clerkUserId,
      email,
      name,
      role,
      isActive: true,
      createdAt: new Date(),
      lastLogin: new Date()
    })

    await adminUser.save()

    return NextResponse.json({ 
      success: true, 
      admin: {
        id: adminUser._id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    
    // If it's a MongoDB connection error, provide helpful message
    if (error instanceof Error && error.message.includes('querySrv')) {
      return NextResponse.json({ 
        error: 'MongoDB connection failed. Please update MONGODB_URI in .env.local with real credentials.' 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 })
  }
}