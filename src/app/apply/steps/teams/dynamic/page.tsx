export default function DynamicTeamPage({
  flash,
  values,
  session,
  teamA,
  teamB,
}: any) {
  return (
    <div>
      <h1>Team Collaboration</h1>
      <p>
        <strong>Team A:</strong> {teamA}
      </p>
      <p>
        <strong>Team B:</strong> {teamB}
      </p>
      <p>
        <strong>URL Path:</strong> /apply/teams/{teamA}/{teamB}
      </p>

      <form method="post" action="/api/apply">
        <div>
          <label>Collaboration Type</label>
          <select
            name="collaborationType"
            defaultValue={values?.collaborationType}
          >
            <option value="">Select collaboration type</option>
            <option value="project">Project Collaboration</option>
            <option value="cross-training">Cross-training</option>
            <option value="knowledge-sharing">Knowledge Sharing</option>
            <option value="joint-initiative">Joint Initiative</option>
          </select>
          {flash?.errors?.fieldErrors?.collaborationType && (
            <p style={{ color: 'red' }}>
              {flash.errors.fieldErrors.collaborationType}
            </p>
          )}
        </div>

        <div>
          <label>Duration (weeks)</label>
          <input
            type="number"
            name="duration"
            min="1"
            max="52"
            defaultValue={values?.duration}
          />
          {flash?.errors?.fieldErrors?.duration && (
            <p style={{ color: 'red' }}>{flash.errors.fieldErrors.duration}</p>
          )}
        </div>

        <div>
          <label>Expected Outcomes</label>
          <textarea
            name="outcomes"
            rows={4}
            defaultValue={values?.outcomes}
            placeholder="Describe the expected outcomes of this collaboration..."
          />
          {flash?.errors?.fieldErrors?.outcomes && (
            <p style={{ color: 'red' }}>{flash.errors.fieldErrors.outcomes}</p>
          )}
        </div>

        <button type="submit">Submit Collaboration Request</button>
      </form>

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '5px',
        }}
      >
        <h3>Dynamic Team URLs:</h3>
        <p>This demonstrates dynamic team combinations:</p>
        <ul>
          <li>
            <a href="/apply/teams/arsenal/chelsea">
              /apply/teams/arsenal/chelsea
            </a>
          </li>
          <li>
            <a href="/apply/teams/liverpool/man-utd">
              /apply/teams/liverpool/man-utd
            </a>
          </li>
          <li>
            <a href="/apply/teams/man-city/tottenham">
              /apply/teams/man-city/tottenham
            </a>
          </li>
          <li>
            <a href="/apply/teams/chelsea/arsenal">
              /apply/teams/chelsea/arsenal
            </a>
          </li>
        </ul>
        <p>
          <strong>How it works:</strong> Any two different team names in the URL{' '}
          <code>/apply/teams/teama/teamb</code> will route to this dynamic page
          component.
        </p>
      </div>
    </div>
  )
}
