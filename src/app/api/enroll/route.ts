import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import Enrollment from '@/models/Enrollment'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { userId } = await auth()
    const body = await request.json()
    
    const { parentName, email, childName, childAge, additionalInfo } = body

    // Validate required fields
    if (!parentName || !email || !childName || !childAge) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = new Enrollment({
      parentName,
      email,
      childName,
      childAge: parseInt(childAge),
      additionalInfo: additionalInfo || '',
      userId: userId || null,
    })

    await enrollment.save()

    return NextResponse.json(
      { message: 'Enrollment submitted successfully', id: enrollment._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json(
      { error: 'Failed to submit enrollment' },
      { status: 500 }
    )
  }
}