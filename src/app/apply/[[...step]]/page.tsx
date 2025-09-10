// app/apply/[[...step]]/page.tsx
import { getSessionServer } from '@/lib/session'

// const teams = [
//   'arsenal',
//   'chelsea',
//   'liverpool',
//   'man-city',
//   'man-utd',
//   'tottenham',
// ]

const stepModules: Record<
  string,
  () => Promise<{
    default: React.ComponentType<{
      flash: unknown
      values: unknown
      session: any
      teamA?: string
      teamB?: string
    }>
  }>
> = {
  // Main application flow
  personal: () => import('../steps/personal/page'),
  info: () => import('../steps/info/page'),
  confirm: () => import('../steps/confirm/page'),
  complete: () => import('../steps/complete/page'),

  // Example: Multi-level nested routes for job applications
  'jobs/engineering/frontend': () =>
    import('../steps/jobs/engineering/frontend/page'),

  // Dynamic team combinations
  'teams/*': () => import('../steps/teams/dynamic/page'),
}

export default async function Page({
  params,
}: {
  params: Promise<{ step?: string[] }>
}) {
  const resolvedParams = await params
  const stepArray = resolvedParams.step ?? ['personal']

  console.log({ resolvedParams })

  // Handle nested URLs by joining the step array with slashes
  // Examples:
  // ['category', 'tech'] -> 'category/tech'
  // ['department', 'engineering', 'frontend'] -> 'department/engineering/frontend'
  const currentStep = stepArray.join('/')

  const session = await getSessionServer()

  // Check for dynamic team combinations (teams/teama/teamb)
  let stepKey = currentStep
  if (currentStep.startsWith('teams/') && stepArray.length === 3) {
    const [, teamA, teamB] = stepArray
    if (teamA && teamB && teamA !== teamB) {
      stepKey = 'teams/*'
    }
  }

  if (!stepModules[stepKey]) {
    return (
      <html>
        <body>
          <div>
            <h1>Step not found</h1>
            <p>Could not find step: {currentStep}</p>
            <p>Available steps: {Object.keys(stepModules).join(', ')}</p>
          </div>
        </body>
      </html>
    )
  }

  const mod = await stepModules[stepKey]()
  const StepPage = mod.default

  // Store flash data - it will be cleared on next form submission
  const flashData = session.flash

  // Extract team names for dynamic team pages
  let teamA = ''
  let teamB = ''
  if (stepKey === 'teams/*' && stepArray.length === 3) {
    const [, teamAFromUrl, teamBFromUrl] = stepArray
    teamA = teamAFromUrl || ''
    teamB = teamBFromUrl || ''
  }

  return (
    <html>
      <body>
        <nav
          style={{
            padding: '10px',
            borderBottom: '1px solid #ccc',
            marginBottom: '20px',
          }}
        >
          <strong>Current Step:</strong> {currentStep}
          <br />
          <small>URL: /apply/{stepArray.join('/')}</small>
        </nav>
        {flashData?.message && (
          <div
            style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}
          >
            {flashData.message}
          </div>
        )}
        <StepPage
          flash={flashData}
          values={flashData?.values}
          session={session}
          teamA={teamA}
          teamB={teamB}
        />
      </body>
    </html>
  )
}
