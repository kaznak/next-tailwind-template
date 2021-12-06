import { useState, FormEvent } from 'react'
import useAuth from 'lib/useAuth'
import { fetchJson, FetchError } from 'lib/fetchJson'

export const SignIn = () => {
  const { mutateAuth } = useAuth({
    redirectTo: '/profile-sg',
    redirectIfFound: true,
  })
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = {
      email: event.currentTarget.email.value,
    }
    try {
      mutateAuth(
        await fetchJson('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMessage(error.data.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <label>
          <span>Type your Email</span>
          <input type="text" name="email" required />
        </label>

        <button type="submit">Sign In</button>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  )
}

export default SignIn
