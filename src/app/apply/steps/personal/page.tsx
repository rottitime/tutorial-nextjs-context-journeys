export default function PersonalPage({ flash, values }: any) {
  return (
    <form method="post">
      <input type="hidden" name="formId" value="personal" />
      <div>
        <label>First name</label>
        <input name="firstName" defaultValue={values?.firstName} />
        {flash?.errors?.fieldErrors?.firstName && (
          <p>{flash.errors.fieldErrors.firstName}</p>
        )}
      </div>
      <div>
        <label>Email</label>
        <input name="email" defaultValue={values?.email} />
        {flash?.errors?.fieldErrors?.email && (
          <p>{flash.errors.fieldErrors.email}</p>
        )}
      </div>
      <button type="submit">Next</button>
    </form>
  )
}
