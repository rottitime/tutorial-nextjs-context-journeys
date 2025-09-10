// lib/journey.ts
export type StepContext = {
  currentStep: string
  formData: Record<string, any>
  session: Record<string, any>
  user?: any // User data for conditional journey logic
}

type StepResolver = (ctx: StepContext) => Promise<string> | string

const flow: Record<string, StepResolver> = {
  start: () => 'personal',
  personal: (ctx) => {
    // If firstName is 'harry', jump directly to complete
    if (ctx.formData.firstName === 'harry') {
      return 'complete'
    }

    // Example: Use user data for conditional routing
    if (ctx.user?.isVip) {
      return 'vip-info' // Skip regular info for VIP users
    }

    // Otherwise, go to info page
    return 'info'
  },
  info: (ctx) => {
    // Example: Route based on user department
    if (ctx.user?.department === 'engineering') {
      return 'engineering-confirm'
    }
    return 'confirm'
  },
  confirm: () => 'complete',
  complete: () => 'complete',
}

export async function resolveJourney(ctx: StepContext): Promise<string> {
  const resolver = flow[ctx.currentStep]
  if (!resolver) return 'start'
  return await resolver(ctx)
}
