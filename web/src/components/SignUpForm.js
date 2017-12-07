import React from 'react'

function SignUpForm({
  onSignUp
}) {
  return (
    <form
      onSubmit={ (event) => {
        // Prevent old-school form submission
        event.preventDefault()
        
        const form = event.target
        const elements = form.elements // Allows looking up fields using their 'name' attributes
        // Get entered values from fields
        const email = elements.email.value
        const password = elements.password.value
        const firstName = elements.firstName.value
        const lastName = elements.lastName.value

        // Pass this information along to the parent component
        onSignUp({ email, password, firstName, lastName })
      } }
    >
      <label
        className='mb-2'
      >
        {'Email: '}
        <input
          type='email'
          name='email'
        />
      </label>
      <label
        className='mb-2'
      >
        {'Password: '}
        <input
          type='password'
          name='password'
        />
      </label>
      <label
        className='mb-2'
      >
        {'First name: '}
        <input
          type='text'
          name='firstName'
        />
      </label>
      <label
        className='mb-2'
      >
        {'Last name: '}
        <input
          type='text'
          name='lastName'
        />
      </label>
      <button>
        Sign Up
      </button>
    </form>
  )
}

export default SignUpForm
