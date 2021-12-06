import { withSessionRoute } from 'lib/withSession'
import { ApiRoute } from 'lib/apiRoute'

export type AuthInfo = {
  email: string
}

export type AuthApiResponse = {
  ok: boolean
  auth: AuthInfo
}

const loginRoute = new ApiRoute()

loginRoute.handlers['GET'] = (req, res) => {
  // get sign-in state
  const { auth } = req.session
  res.send({ ok: true, auth })
}

loginRoute.handlers['POST'] = async (req, res) => {
  // sign-in
  const { email } = req.body
  // !TODO! sign in operations
  const auth = { email }
  req.session.auth = auth
  await req.session.save()
  res.send({ ok: true, auth })
}

loginRoute.handlers['PUT'] = async (req, res) => {
  // sign-up
  const { email } = req.body
  // !TODO! sign up operations
  const auth = { email }
  req.session.auth = auth
  await req.session.save()
  res.send({ ok: true, auth })
}

loginRoute.handlers['DELETE'] = async (req, res) => {
  // sign-out
  req.session.auth = undefined
  await req.session.save()
  const { auth } = req.session
  res.send({ ok: true, auth })
}

export default withSessionRoute(loginRoute.handler)
