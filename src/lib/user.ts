// lib/user.ts
// User service for fetching and managing user data

export interface User {
  id: string | null
  name: string
  email?: string
  isVip?: boolean
  department?: string
  // Add other user properties as needed
}

export interface UserServiceConfig {
  apiUrl: string
  getAuthToken: () => string
}

class UserService {
  private config: UserServiceConfig

  constructor(config: UserServiceConfig) {
    this.config = config
  }

  /**
   * Fetch user data from the API
   * @returns Promise<User> - User data or fallback user object
   */
  async fetchUser(): Promise<User> {
    try {
      const response = await fetch(this.config.apiUrl, {
        headers: {
          Authorization: `Bearer ${this.config.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Ensure fresh data on each request
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`)
      }

      const userData = await response.json()
      return userData
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      // Return a fallback user object
      return {
        id: null,
        name: 'Guest',
        isVip: false,
        department: 'general',
      }
    }
  }

  /**
   * Get user data with caching logic
   * @param session - Current session object
   * @returns Promise<User> - User data from cache or fresh fetch
   */
  async getUserWithCache(session: any): Promise<User> {
    // Return cached user data if available
    if (session.user) {
      return session.user
    }

    // Fetch fresh user data
    const user = await this.fetchUser()
    return user
  }
}

// Default configuration - replace with your actual values
const defaultConfig: UserServiceConfig = {
  apiUrl: 'https://api.example.com/user',
  getAuthToken: () => {
    // This is a placeholder - implement your actual auth logic here
    // Examples:
    // - Read from cookies
    // - Read from headers
    // - Use NextAuth session
    // - Use your custom auth system
    return 'your-auth-token-here'
  },
}

// Export a singleton instance
export const userService = new UserService(defaultConfig)

// Export the class for custom instances if needed
export { UserService }
