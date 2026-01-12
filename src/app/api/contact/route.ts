import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { userId } = await auth()
    const body = await request.json()
    
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      userId: userId || null,
    })

    await contact.save()

    return NextResponse.json(
      { message: 'Contact message sent successfully', id: contact._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    )
  }
}