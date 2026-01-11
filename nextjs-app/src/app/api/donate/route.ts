import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import Donation from '@/models/Donation'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { userId } = await auth()
    const body = await request.json()
    
    const { name, email, amount, customAmount, message } = body

    // Validate required fields
    if (!name || !email || (!amount && !customAmount)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Determine final amount
    const finalAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount)

    if (isNaN(finalAmount) || finalAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid donation amount' },
        { status: 400 }
      )
    }

    // Create donation record
    const donation = new Donation({
      name,
      email,
      amount: finalAmount,
      message: message || '',
      userId: userId || null,
    })

    await donation.save()

    return NextResponse.json(
      { message: 'Donation recorded successfully', id: donation._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Donation error:', error)
    return NextResponse.json(
      { error: 'Failed to record donation' },
      { status: 500 }
    )
  }
}