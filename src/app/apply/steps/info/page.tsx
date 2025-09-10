export default function InfoPage() {
  return (
    <form method="post" action="/api/apply">
      <input type="hidden" name="currentStep" value="info" />
      <p>ℹ️ Please read this important information before continuing.</p>
      <button type="submit">Next</button>
    </form>
  )
}
