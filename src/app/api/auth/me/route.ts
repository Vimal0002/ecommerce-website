import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getMockUserById } from '@/lib/mock-auth'

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    let user = null

    try {
      // Try database first
      user = await prisma.user.findUnique({
        where: { id: currentUser.userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true
        }
      })
    } catch (dbError) {
      console.error('Database query failed, falling back to mock user:', dbError)
      
      // Fallback to mock user
      const mockUser = getMockUserById(currentUser.userId)
      if (mockUser) {
        user = {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          createdAt: new Date()
        }
      }
    }

    if (!user) {
      // Try mock user as final fallback
      const mockUser = getMockUserById(currentUser.userId)
      if (mockUser) {
        user = {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          createdAt: new Date()
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}