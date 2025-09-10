export default function ConfirmPage() {
  return (
    <form method="post" action="/api/apply">
      <p>Please confirm your details.</p>
      <button type="submit">Confirm</button>
    </form>
  )
}
