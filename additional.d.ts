import type { AuthInfo } from 'lib/pages/api/auth'

declare module 'iron-session' {
  interface IronSessionData {
    auth?: AuthInfo
  }
}
