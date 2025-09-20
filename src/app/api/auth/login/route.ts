import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { comparePasswords, generateToken } from '@/lib/auth'
import { authenticateMockUser } from '@/lib/mock-auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    let user = null
    let isValidPassword = false

    try {
      // Try database authentication first
      user = await prisma.user.findUnique({
        where: { email: validatedData.email }
      })

      if (user) {
        isValidPassword = await comparePasswords(validatedData.password, user.password)
      }
    } catch (dbError) {
      console.error('Database authentication failed, falling back to mock auth:', dbError)
      
      // Fallback to mock authentication
      const mockUser = authenticateMockUser(validatedData.email, validatedData.password)
      if (mockUser) {
        user = mockUser
        isValidPassword = true
      }
    }

    // If database failed and no user found, try mock auth
    if (!user) {
      const mockUser = authenticateMockUser(validatedData.email, validatedData.password)
      if (mockUser) {
        user = mockUser
        isValidPassword = true
      }
    }

    if (!user || !isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    // Set cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}