import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isAdmin, updateLastLogin } from '@/lib/adminAuth'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ isAdmin: false }, { status: 401 })
    }

    const adminStatus = await isAdmin()
    
    if (adminStatus) {
      // Update last login time
      await updateLastLogin(userId)
    }

    return NextResponse.json({ isAdmin: adminStatus })
  } catch (error) {
    console.error('Error checking admin status:', error)
    return NextResponse.json({ isAdmin: false }, { status: 500 })
  }
}