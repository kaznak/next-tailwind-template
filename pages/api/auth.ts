import { withSessionRoute } from 'lib/withSession'
import { ApiRoute } from 'lib/apiRoute'

export type AuthInfo = {
  email: string
}

const loginRoute = new ApiRoute()

loginRoute.handlers['GET'] = (req, res) => {
  // get sign-in state
  const { user } = req.session
  res.send({ ok: true, user })
}

loginRoute.handlers['POST'] = async (req, res) => {
  // sign-in
  const { email } = req.body
  // !TODO! sign in operations
  const user = { email }
  req.session.user = user
  await req.session.save()
  res.send({ ok: true, user })
}

loginRoute.handlers['PUT'] = async (req, res) => {
  // sign-up
  const { email } = req.body
  // !TODO! sign up operations
  const user = { email }
  req.session.user = user
  await req.session.save()
  res.send({ ok: true, user })
}

loginRoute.handlers['DELETE'] = async (req, res) => {
  // sign-out
  req.session.user = undefined
  await req.session.save()
  const { user } = req.session
  res.send({ ok: true, user })
}

export default withSessionRoute(loginRoute.handler)
