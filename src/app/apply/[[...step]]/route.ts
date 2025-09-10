// app/apply/[[...step]]/route.ts
import { NextResponse } from 'next/server'
import { getSessionServer, commitSession, flashSession } from '@/lib/session'
import { resolveJourney } from '@/lib/journey'
import { validators } from '@/lib/validation'

export async function POST(
  req: Request,
  { params }: { params: { step?: string[] } }
) {
  const currentStep = (params.step ?? ['start'])[0]
  const formData = Object.fromEntries(await (req as any).formData())

  const session = await getSessionServer()

  // Check if this is a form step
  if (formData.formId && validators[formData.formId]) {
    const result = validators[formData.formId].safeParse(formData)
    if (!result.success) {
      // Save errors + form values in flash
      await flashSession(session, {
        errors: result.error.flatten(),
        values: formData,
      })
      await commitSession(session)
      return NextResponse.redirect(`/apply/${currentStep}`, { status: 303 })
    }

    // Save validated form data in session
    session.data = {
      ...(session.data || {}),
      [formData.formId]: result.data,
    }
  } else {
    // Content-only step → just record that it was visited
    session.data = {
      ...(session.data || {}),
      visited: [...(session.data?.visited || []), currentStep],
    }
  }

  // Figure out next step
  const nextStep = await resolveJourney({
    currentStep,
    formData,
    session,
  })

  await commitSession(session)

  return NextResponse.redirect(`/apply/${nextStep}`, { status: 303 })
}
