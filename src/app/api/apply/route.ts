// app/api/apply/route.ts
import { NextResponse } from 'next/server'
import { getSessionServer, commitSession, flashSession } from '@/lib/session'
import { resolveJourney } from '@/lib/journey'
import { validators } from '@/lib/validation'

export async function POST(req: Request) {
  try {
    const formData = Object.fromEntries(await (req as any).formData())

    // Automatically detect current step from referrer URL
    let currentStep = 'start'
    const referer = req.headers.get('referer')
    if (referer) {
      const refererUrl = new URL(referer)
      const pathSegments = refererUrl.pathname.split('/').filter(Boolean)
      currentStep = pathSegments[1] || 'start' // /apply/step -> step
    }

    // Automatically detect formId from current step (if it's a form step)
    const formId = (formData.formId as string) || currentStep

    const session = await getSessionServer()

    // Clear any existing flash messages when processing a new form submission
    if (session.flash) {
      session.flash = undefined
    }

    // Check if this is a form step
    if (validators[formId]) {
      const result = validators[formId].safeParse(formData)
      if (!result.success) {
        // Save errors + form values in flash
        await flashSession(session, {
          errors: result.error.flatten(),
          values: formData,
        })

        // Create response with redirect
        const url = new URL(req.url)
        const errorResponse = NextResponse.redirect(
          `${url.origin}/apply/${currentStep}`,
          { status: 303 }
        )
        errorResponse.cookies.set('app_session', JSON.stringify(session), {
          path: '/',
        })
        return errorResponse
      }

      // Save validated form data in session
      session.data = {
        ...(session.data || {}),
        [formId]: result.data,
      }
    } else {
      // Content-only step → just record that it was visited
      session.data = {
        ...(session.data || {}),
        visited: [...(session.data?.visited || []), currentStep],
      }
    }

    // Get user data from session (should be available from page load)
    const user = session.user

    // Figure out next step
    const nextStep = await resolveJourney({
      currentStep,
      formData,
      session,
      user, // Pass user data for conditional journey logic
    })

    // Create response with redirect
    const url = new URL(req.url)
    const response = NextResponse.redirect(`${url.origin}/apply/${nextStep}`, {
      status: 303,
    })

    // Set session cookie
    response.cookies.set('app_session', JSON.stringify(session), { path: '/' })

    return response
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
