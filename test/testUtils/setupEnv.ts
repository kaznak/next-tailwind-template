// add this to your setupFilesAfterEnv config in jest so it's imported for every test file
import nodeFetch from 'node-fetch'
import { TextEncoder, TextDecoder } from 'util'

import { setupServer } from 'msw/node'
import { handlers } from './serverHandlers'

const baseUrl = 'http://localhost:3000'

const server = setupServer(...handlers(baseUrl))
// const server = setupServer(...handlers())

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// @ts-expect-error for the type difference between `node-fetch` and `typescript/lib/lib.dom.d.ts`.
global.fetch = (input, init?) => nodeFetch(baseUrl + input, init)

// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}
