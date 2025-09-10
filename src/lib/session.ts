// lib/session.ts
import { cookies } from 'next/headers'

const SESSION_KEY = 'app_session'

export async function getSessionServer() {
  const cookieStore = await cookies()
  const raw = cookieStore.get(SESSION_KEY)?.value
  return raw ? JSON.parse(raw) : { data: {}, flash: {} }
}

export async function commitSession(session: any) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_KEY, JSON.stringify(session), { path: '/' })
}

export async function flashSession(session: any, flash: any) {
  session.flash = flash
  return session
}
