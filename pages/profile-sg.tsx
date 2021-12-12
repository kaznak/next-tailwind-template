import useAuth from 'hooks/useAuth'

export default function SgProfile() {
  const { errorMessage, auth, signOutHandler } = useAuth({
    redirectTo: '/signin',
  })

  return (
    <div className="container">
      <p>{JSON.stringify(auth)}</p>
      <button onClick={signOutHandler}>Sign Out</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}
