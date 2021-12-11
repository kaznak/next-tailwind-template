export type AuthInfo = {
  email: string
}

export type AuthRequest = AuthInfo

export type AuthApiResponse = {
  ok: boolean
  auth: AuthInfo
}
