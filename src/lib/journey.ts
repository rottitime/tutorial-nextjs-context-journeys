// lib/journey.ts
export type StepContext = {
  currentStep: string
  formData: Record<string, any>
  session: Record<string, any>
}

type StepResolver = (ctx: StepContext) => Promise<string> | string

const flow: Record<string, StepResolver> = {
  start: () => 'personal',
  personal: (ctx) => {
    // If firstName is 'harry', jump directly to complete
    if (ctx.formData.firstName === 'harry') {
      return 'complete'
    }
    // Otherwise, go to info page
    return 'info'
  },
  info: () => 'confirm', // 👈 info → confirm
  confirm: () => 'complete',
  complete: () => 'complete',
}

export async function resolveJourney(ctx: StepContext): Promise<string> {
  const resolver = flow[ctx.currentStep]
  if (!resolver) return 'start'
  return await resolver(ctx)
}
