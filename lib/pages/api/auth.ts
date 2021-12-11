export type AuthInfo = {
  email: string
}

export type AuthApiResponse = {
  ok: boolean
  auth: AuthInfo
}
