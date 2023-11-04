import { Elysia } from 'elysia'
import AuthService from '../services/auth.service'

const service = new AuthService()

export const authRouter = new Elysia().group('/auth', (app) =>
  app.post('/login', async ({ body, set, jwt, setCookie }: any) => {
    const { userName, password } = body
    const user = await service.login({ userName, password })
    setCookie('token', await jwt.sign({ userId: user.id }))
    set.status = 200
    return user.toClient()
  })
)
