export default function FrontendJobPage({ flash, values }: any) {
  return (
    <div>
      <h1>Frontend Engineering Position</h1>
      <p>
        <strong>Department:</strong> Engineering → Frontend Team
      </p>
      <p>
        <strong>URL Path:</strong> /apply/jobs/engineering/frontend
      </p>

      <form method="post" action="/api/apply">
        <div>
          <label>Years of Frontend Experience</label>
          <input
            type="number"
            name="experience"
            min="0"
            max="20"
            defaultValue={values?.experience}
          />
          {flash?.errors?.fieldErrors?.experience && (
            <p style={{ color: 'red' }}>
              {flash.errors.fieldErrors.experience}
            </p>
          )}
        </div>

        <div>
          <label>Primary Framework</label>
          <select name="framework" defaultValue={values?.framework}>
            <option value="">Select framework</option>
            <option value="react">React</option>
            <option value="vue">Vue.js</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
          </select>
          {flash?.errors?.fieldErrors?.framework && (
            <p style={{ color: 'red' }}>{flash.errors.fieldErrors.framework}</p>
          )}
        </div>

        <div>
          <label>Additional Skills (comma-separated)</label>
          <input
            name="skills"
            placeholder="e.g., TypeScript, CSS, Testing, Performance"
            defaultValue={values?.skills}
          />
          {flash?.errors?.fieldErrors?.skills && (
            <p style={{ color: 'red' }}>{flash.errors.fieldErrors.skills}</p>
          )}
        </div>

        <div>
          <label>Portfolio/GitHub URL</label>
          <input
            type="url"
            name="portfolio"
            defaultValue={values?.portfolio}
            placeholder="https://github.com/username or https://yourportfolio.com"
          />
          {flash?.errors?.fieldErrors?.portfolio && (
            <p style={{ color: 'red' }}>{flash.errors.fieldErrors.portfolio}</p>
          )}
        </div>

        <button type="submit">Submit Application</button>
      </form>

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '5px',
        }}
      >
        <h3>Example Nested URLs:</h3>
        <p>
          This demonstrates how the <code>[[...step]]</code> catch-all route
          handles multiple nested URL segments:
        </p>
        <ul>
          <li>
            <a href="/apply/jobs/engineering/frontend">
              /apply/jobs/engineering/frontend
            </a>{' '}
            (3 levels)
          </li>
          <li>
            <a href="/apply/jobs/engineering/backend">
              /apply/jobs/engineering/backend
            </a>{' '}
            (3 levels)
          </li>
          <li>
            <a href="/apply/jobs/product/design">/apply/jobs/product/design</a>{' '}
            (3 levels)
          </li>
          <li>
            <a href="/apply/jobs/sales/enterprise">
              /apply/jobs/sales/enterprise
            </a>{' '}
            (3 levels)
          </li>
        </ul>
        <p>
          <strong>How it works:</strong> The URL segments{' '}
          <code>['jobs', 'engineering', 'frontend']</code> are joined with
          slashes to create the key <code>'jobs/engineering/frontend'</code>{' '}
          which maps to the corresponding page component.
        </p>
      </div>
    </div>
  )
}
