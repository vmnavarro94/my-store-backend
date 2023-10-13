import { Elysia } from 'elysia'
import { userRouter } from './user.router'
import { authRouter } from './auth.router'
import { categoryRouter } from './category.router'
import { productRouter } from './product.router'
import { customerRouter } from './customer.router'

export const appRouter = (app: Elysia) =>
  app.group('/api/v1', (app) =>
    app
      .use(userRouter)
      .use(authRouter)
      .use(categoryRouter)
      .use(productRouter)
      .use(customerRouter)
  )
