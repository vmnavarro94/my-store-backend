import { Elysia } from 'elysia'
import { User as UserType } from '../types/user.type'
import UserService from '../services/user.service'
import { isAuthenticated } from '../middlewares/auth.handler'

const service = new UserService()

export const userRouter = (app: Elysia) =>
  app.group('/users', (app) =>
    app
      .post('/', async ({ body, set }) => {
        const newUser = await service.create(body as UserType)
        set.status = 201
        return newUser.toClient()
      })
      .use(isAuthenticated)
      .get('/', async ({ set }) => {
        const users = await service.find()
        set.status = 200
        return users
      })
      .get('/:id', async ({ params: { id }, set }) => {
        const user = await service.findById(id)
        set.status = 200
        return user.toClient()
      })
      .patch('/:id', async ({ params: { id }, body: user, set }) => {
        const updatedUser = await service.update(id, user as UserType)
        set.status = 200
        return updatedUser.toClient()
      })
  )
