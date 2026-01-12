import { auth } from '@clerk/nextjs/server'
import AdminUser from '@/models/AdminUser'
import connectDB from './mongodb'

export async function isAdmin(): Promise<boolean> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return false
    }

    await connectDB()
    const adminUser = await AdminUser.findOne({ 
      clerkUserId: userId, 
      isActive: true 
    })

    return !!adminUser
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

export async function getAdminUser(clerkUserId: string) {
  try {
    await connectDB()
    return await AdminUser.findOne({ 
      clerkUserId, 
      isActive: true 
    })
  } catch (error) {
    console.error('Error getting admin user:', error)
    return null
  }
}

export async function createAdminUser(userData: {
  clerkUserId: string
  email: string
  name: string
  role?: 'admin' | 'super_admin'
}) {
  try {
    await connectDB()
    
    const existingAdmin = await AdminUser.findOne({ 
      clerkUserId: userData.clerkUserId 
    })
    
    if (existingAdmin) {
      return existingAdmin
    }

    const adminUser = new AdminUser({
      ...userData,
      role: userData.role || 'admin'
    })

    await adminUser.save()
    return adminUser
  } catch (error) {
    console.error('Error creating admin user:', error)
    throw error
  }
}

export async function updateLastLogin(clerkUserId: string) {
  try {
    await connectDB()
    await AdminUser.findOneAndUpdate(
      { clerkUserId },
      { lastLogin: new Date() }
    )
  } catch (error) {
    console.error('Error updating last login:', error)
  }
}