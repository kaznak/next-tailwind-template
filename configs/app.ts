import type { IronSessionOptions } from 'iron-session'
// import type { IronSessionOptions } from 'node_modules/iron-session/dist'

export const sessionOptions: IronSessionOptions = {
  cookieName: process.env.NEXT_PUBLIC_SYSTEM_APP_NAME,
  password: process.env.SECRET_SESSION_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
