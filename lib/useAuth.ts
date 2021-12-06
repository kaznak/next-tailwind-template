import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

import type { AuthApiResponse } from 'pages/api/auth'

export default function useAuth({
  redirectTo = undefined,
  redirectIfFound = false,
} = {}) {
  const { data, mutate: mutateAuth } = useSWR<AuthApiResponse>('/api/auth')

  // const { ok, auth: authInfo } = data
  // console.log(authInfo)
  // console.log(redirectIfFound && authInfo)

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if AuthInfo data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !data) return

    if (
      // If redirectTo is set, redirect if the AuthInfo was not found.
      (!redirectIfFound && !data.auth) ||
      // If redirectIfFound is also set, redirect if the AuthInfo was found
      (redirectIfFound && data.auth)
    ) {
      Router.push(redirectTo)
    }
  }, [data, redirectIfFound, redirectTo])

  return { auth: data?.auth, mutateAuth }
}
