// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest } from 'msw' // msw supports graphql too!

const handlers = (baseUrl = '') => [
  rest.get(baseUrl + '/api/hello', (req, res, ctx) => {
    return res(ctx.json({ name: 'Jane Doe' }))
  }),
]

export { handlers }
