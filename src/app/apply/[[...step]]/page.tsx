// app/apply/[[...step]]/page.tsx
import { getSessionServer } from '@/lib/session'

const stepModules: Record<
  string,
  () => Promise<{
    default: React.ComponentType<{ flash: unknown; values: unknown }>
  }>
> = {
  personal: () => import('../steps/personal/page'),
  info: () => import('../steps/info/page'),
  confirm: () => import('../steps/confirm/page'),
  complete: () => import('../steps/complete/page'),
}

export default async function Page({
  params,
}: {
  params: Promise<{ step?: string[] }>
}) {
  const resolvedParams = await params
  const currentStep = (resolvedParams.step ?? ['start'])[0]
  const session = await getSessionServer()

  if (!stepModules[currentStep]) return <p>Step not found</p>

  const mod = await stepModules[currentStep]()
  const StepPage = mod.default

  // Store flash data - it will be cleared on next form submission
  const flashData = session.flash

  return (
    <html>
      <body>
        {flashData?.message && <div>{flashData.message}</div>}
        <StepPage flash={flashData} values={flashData?.values} />
      </body>
    </html>
  )
}
