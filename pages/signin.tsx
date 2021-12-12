import useAuth from 'hooks/useAuth'

export const SignIn = () => {
  const { errorMessage, signInHandler } = useAuth({
    redirectTo: '/profile-sg',
    redirectIfFound: true,
  })

  return (
    <div className="container">
      <form onSubmit={signInHandler}>
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
