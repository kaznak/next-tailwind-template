// add this to your setupFilesAfterEnv config in jest so it's imported for every test file
import nodeFetch from 'node-fetch'

import { setupServer } from 'msw/node'
import { handlers } from './serverHandlers'

const baseUrl = 'http://localhost:3000'

const server = setupServer(...handlers(baseUrl))
// const server = setupServer(...handlers())

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

global.fetch = (input, init?) => nodeFetch(baseUrl + input, init)
