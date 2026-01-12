import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import Newsletter from '@/models/Newsletter'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { userId } = await auth()
    const body = await request.json()
    
    const { firstName, lastName, email } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email })
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate subscription
        existingSubscriber.status = 'active'
        existingSubscriber.subscribedAt = new Date()
        await existingSubscriber.save()
        
        return NextResponse.json(
          { message: 'Welcome back! Your subscription has been reactivated.' },
          { status: 200 }
        )
      }
      
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 409 }
      )
    }

    // Create newsletter subscription
    const newsletter = new Newsletter({
      firstName,
      lastName,
      email,
      userId: userId || null,
    })

    await newsletter.save()

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter', id: newsletter._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}
