import useAuth from 'lib/useAuth'
import { useState } from 'react'
import { fetchJson, FetchError } from 'lib/fetchJson'

export default function SgProfile() {
  const { auth, mutateAuth } = useAuth({
    redirectTo: '/signin',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const signOut = async () => {
    try {
      mutateAuth(
        await fetchJson('/api/auth', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
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
      <p>{JSON.stringify(auth)}</p>
      <button onClick={signOut}>Sign Out</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}
