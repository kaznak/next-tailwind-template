// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApiRoute } from 'lib/apiRoute'
import type { HelloApiResponse } from 'lib/pages/api/hello'

const helloApiRoute = new ApiRoute<HelloApiResponse>()

helloApiRoute.handlers['GET'] = (_, res) => {
  res.status(200).json({ name: 'John Doe' })
}

export default helloApiRoute.handler
