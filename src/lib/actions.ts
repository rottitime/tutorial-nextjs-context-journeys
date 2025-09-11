// lib/actions.ts
'use server'

import { getSessionServer } from '@/lib/session'
import { userService } from '@/lib/user'

export async function fetchUserData() {
  try {
    const session = await getSessionServer()

    // Return cached user data if available
    if (session.user) {
      return { success: true, user: session.user }
    }

    // Fetch fresh user data (don't store in session here - that will happen on form submission)
    const user = await userService.fetchUser()

    return { success: true, user }
  } catch (error) {
    console.error('Failed to fetch user data in Server Action:', error)
    // Return fallback user data
    const fallbackUser = {
      id: null,
      name: 'Guest',
      isVip: false,
      department: 'general',
    }
    return {
      success: false,
      user: fallbackUser,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
