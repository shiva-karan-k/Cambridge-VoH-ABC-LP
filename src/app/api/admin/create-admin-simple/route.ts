import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo (replace with real DB later)
let adminUsers: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clerkUserId, email, name, role = 'admin' } = body

    if (!clerkUserId || !email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if admin already exists
    const existingAdmin = adminUsers.find(admin => 
      admin.clerkUserId === clerkUserId || admin.email === email
    )
    
    if (existingAdmin) {
      return NextResponse.json({ 
        success: true,
        message: 'Admin already exists',
        admin: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        }
      })
    }

    // Create new admin
    const adminUser = {
      id: Date.now().toString(),
      clerkUserId,
      email,
      name,
      role,
      isActive: true,
      createdAt: new Date(),
      lastLogin: new Date()
    }

    adminUsers.push(adminUser)

    return NextResponse.json({ 
      success: true, 
      message: 'Admin account created successfully! (Note: Using temporary storage - set up MongoDB for persistence)',
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 })
  }
}

// GET endpoint to check if admin exists
export async function GET() {
  return NextResponse.json({ 
    admins: adminUsers.map(admin => ({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    }))
  })
}