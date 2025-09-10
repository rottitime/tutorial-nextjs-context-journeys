export default function ConfirmPage() {
  return (
    <form method="post" action="/api/apply">
      <input type="hidden" name="currentStep" value="confirm" />
      <p>Please confirm your details.</p>
      <button type="submit">Confirm</button>
    </form>
  )
}
