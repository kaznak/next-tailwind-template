import { fetchJson } from 'lib/fetchJson'
import type { AuthRequest, AuthApiResponse } from 'lib/pages/api/auth'

export async function signIn(body: AuthRequest) {
  return fetchJson<AuthApiResponse>('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function signOut() {
  return fetchJson<AuthApiResponse>('/api/auth', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
}
