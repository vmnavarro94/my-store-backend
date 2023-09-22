import { Elysia } from 'elysia'
import boom from '@hapi/boom'
import UserService from '../services/user.service'

export const isAuthenticated = (app: Elysia) =>
  //TODO: fix this any
  app.derive(async ({ cookie, jwt }: any) => {
    if (!cookie!.token) {
      throw boom.unauthorized('You are not authenticated')
    }

    const { userId } = await jwt.verify(cookie.token)
    if (!userId) {
      throw boom.unauthorized('You are not authenticated')
    }

    const service = new UserService()
    try {
      const user = await service.findById(userId)
      if (!user.activeUser) {
        throw boom.unauthorized('You are not authenticated')
      }
    } catch (error) {
      throw boom.unauthorized('You are not authenticated')
    }
  })
