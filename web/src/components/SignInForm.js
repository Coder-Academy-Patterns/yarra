import React from 'react'

function SignInForm({
  onSignIn
}) {
  return (
    <form
      className='mt-3 mb-3'
      onSubmit={ (event) => {
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        const email = elements.email.value
        const password = elements.password.value

        onSignIn({ email, password })
      } }
    >
      <label className='mb-2'>
        {'Email: '}
        <input
          type='email'
          name='email'
        />
      </label>

      <label className='mb-2'>
        {'Password: '}
        <input
          type='password'
          name='password'
        />
      </label>

      <button>Sign In</button>
    </form>
  )
}

export default SignInForm
