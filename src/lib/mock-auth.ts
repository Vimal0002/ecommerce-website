// Simple mock authentication for demo purposes when database is not available

export interface MockUser {
  id: string
  email: string
  name?: string
}

// In-memory user store (for demo only)
const mockUsers: Map<string, MockUser & { password: string }> = new Map()

// Pre-populate with a demo user
mockUsers.set('demo@example.com', {
  id: 'demo-user-1',
  email: 'demo@example.com',
  name: 'Demo User',
  password: 'demo123' // In real app, this would be hashed
})

export function createMockUser(email: string, password: string, name?: string): MockUser {
  const id = `user-${Date.now()}`
  const user = { id, email, name, password }
  mockUsers.set(email, user)
  
  return { id, email, name }
}

export function authenticateMockUser(email: string, password: string): MockUser | null {
  const user = mockUsers.get(email)
  if (user && user.password === password) {
    return { id: user.id, email: user.email, name: user.name }
  }
  return null
}

export function getMockUserByEmail(email: string): MockUser | null {
  const user = mockUsers.get(email)
  if (user) {
    return { id: user.id, email: user.email, name: user.name }
  }
  return null
}

export function getMockUserById(id: string): MockUser | null {
  for (const user of mockUsers.values()) {
    if (user.id === id) {
      return { id: user.id, email: user.email, name: user.name }
    }
  }
  return null
}

export function registerMockUser(email: string, password: string, name?: string): MockUser | null {
  // Check if user already exists
  if (mockUsers.has(email)) {
    return null // User already exists
  }
  
  return createMockUser(email, password, name)
}
