import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

type HttpMethods =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH'

type NextApiExtendedHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  error: unknown
) => void | Promise<void>

type HandlersMap<T> = Partial<Record<HttpMethods, NextApiHandler<T>>>

export class ApiRoute<T = any> {
  handlers: HandlersMap<T>
  defaultHandler: NextApiHandler<T>
  defaultErrorHandler: NextApiExtendedHandler<T>
  get handler(): NextApiHandler<T> {
    if (this.defaultErrorHandler) {
      return (req, res) => {
        const { method } = req
        const handler = this.handlers[method]
        try {
          if (handler) {
            return handler(req, res)
          } else {
            return this.defaultHandler(req, res)
          }
        } catch (error) {
          return this.defaultErrorHandler(req, res, error)
        }
      }
    } else {
      return (req, res) => {
        const { method } = req
        const handler = this.handlers[method]
        if (handler) {
          return handler(req, res)
        } else {
          return this.defaultHandler(req, res)
        }
      }
    }
  }
  get allowMethods(): HttpMethods[] {
    return Object.keys(this.handlers) as HttpMethods[]
  }

  constructor({
    handlers,
    additionalHandlers,
    defaultHandler,
    defaultErrorHandler,
  }: Partial<{
    handlers: HandlersMap<T>
    additionalHandlers: HandlersMap<T>
    defaultHandler: NextApiHandler<T>
    defaultErrorHandler: NextApiExtendedHandler<T>
  }> = {}) {
    this.handlers = Object.assign(
      handlers || { OPTIONS: this.methodOptionHandler },
      additionalHandlers
    )
    this.defaultHandler = defaultHandler || this.status405handler
    this.defaultErrorHandler = defaultErrorHandler || this.status500handler
  }

  /* default handlers */
  protected readonly methodOptionHandler: NextApiHandler<T> = (_, res) => {
    res.setHeader('Allow', this.allowMethods)
    res.status(204).end()
  }

  protected readonly status405handler: NextApiHandler<T> = (req, res) => {
    res.setHeader('Allow', this.allowMethods)
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  protected readonly status500handler: NextApiExtendedHandler<T> = (
    _,
    res,
    error = undefined
  ) => {
    if (error) {
      res.status(500).end(`Internal Server Error: ${error.toString()}`)
    } else {
      res.status(500).end(`Internal Server Error`)
    }
  }
}
