import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import mongoose, { type ConnectOptions } from 'mongoose'
import config from './config/config'
import { appRouter } from './routes'
import { elysiaErrorHandler } from './middlewares/error.handler'

const { port, mongoUri } = config

export const app = new Elysia()
  .use(cors())
  .onError(elysiaErrorHandler)
  .use(appRouter)

const init = async () => {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as unknown as ConnectOptions)

  app.listen(port, () => console.log(`Listening on port ${port}...`))
}

init()
