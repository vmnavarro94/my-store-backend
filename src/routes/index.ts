import { Elysia } from 'elysia'
import { userRouter } from './user.router'
import { authRouter } from './auth.router'

export const appRouter = (app: Elysia) =>
  app.group('/api/v1', (app) => app.use(userRouter).use(authRouter))
