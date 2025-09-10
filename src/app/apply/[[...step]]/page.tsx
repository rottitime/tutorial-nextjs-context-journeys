// app/apply/[[...step]]/page.tsx
import { getSessionServer } from '@/lib/session'

const stepModules: Record<string, () => Promise<any>> = {
  personal: () => import('../steps/personal/page'),
  info: () => import('../steps/info/page'),
  confirm: () => import('../steps/confirm/page'),
  complete: () => import('../steps/complete/page'),
}

export default async function Page({
  params,
}: {
  params: { step?: string[] }
}) {
  const currentStep = (params.step ?? ['start'])[0]
  const session = await getSessionServer()

  if (!stepModules[currentStep]) return <p>Step not found</p>

  const mod = await stepModules[currentStep]()
  const StepPage = mod.default

  return (
    <html>
      <body>
        {session.flash?.message && <div>{session.flash.message}</div>}
        <StepPage flash={session.flash} values={session.flash?.values} />
      </body>
    </html>
  )
}
