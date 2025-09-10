// lib/journey.ts
export type StepContext = {
  currentStep: string
  formData: Record<string, any>
  session: Record<string, any>
}

type StepResolver = (ctx: StepContext) => Promise<string> | string

const flow: Record<string, StepResolver> = {
  start: () => 'personal',
  personal: () => 'info', // 👈 now goes to info page
  info: () => 'confirm', // 👈 info → confirm
  confirm: () => 'complete',
  complete: () => 'complete',
}

export async function resolveJourney(ctx: StepContext): Promise<string> {
  const resolver = flow[ctx.currentStep]
  if (!resolver) return 'start'
  return await resolver(ctx)
}
