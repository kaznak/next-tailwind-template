import { useState, useEffect, useCallback, FormEvent } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { FetchError } from 'lib/fetchJson'
import type { AuthRequest, AuthApiResponse } from 'lib/pages/api/auth'
import { signIn as signInRaw, signOut as signOutRaw } from 'lib/apiClients/auth'

export default function useAuth({
  redirectTo = undefined,
  redirectIfFound = false,
} = {}) {
  const { data, mutate: mutateAuth } = useSWR<AuthApiResponse>('/api/auth')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!redirectTo || !data) return
    if ((!redirectIfFound && !data.auth) || (redirectIfFound && data.auth)) {
      Router.push(redirectTo)
    }
  }, [data, redirectIfFound, redirectTo])

  const signIn = useCallback(
    async (body: AuthRequest) => mutateAuth(await signInRaw(body)),
    [mutateAuth]
  )

  const signInHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const body: AuthRequest = {
        email: event.currentTarget.email.value,
      }
      try {
        signIn(body)
      } catch (error) {
        if (error instanceof FetchError) {
          setErrorMessage(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    },
    [signIn, setErrorMessage]
  )

  const signOut = useCallback(
    async () => mutateAuth(await signOutRaw()),
    [mutateAuth]
  )

  const signOutHandler = useCallback(async () => {
    try {
      signOut()
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMessage(error.data.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }, [signOut, setErrorMessage])

  return {
    errorMessage,
    setErrorMessage,
    data,
    mutateAuth,
    signIn,
    signInHandler,
    signOut,
    signOutHandler,
    auth: data?.auth,
  }
}
