import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

import type { AuthApiResponse } from 'pages/api/auth'

export default function useAuth({
  redirectTo = undefined,
  redirectIfFound = false,
} = {}) {
  const { data, mutate: mutateAuth } = useSWR<AuthApiResponse>('/api/auth')

  useEffect(() => {
    if (!redirectTo || !data) return
    if ((!redirectIfFound && !data.auth) || (redirectIfFound && data.auth)) {
      Router.push(redirectTo)
    }
  }, [data, redirectIfFound, redirectTo])

  return { auth: data?.auth, mutateAuth }
}
