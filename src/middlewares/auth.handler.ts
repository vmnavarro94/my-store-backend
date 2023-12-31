import { Elysia } from 'elysia'
import boom from '@hapi/boom'
import UserService from '../services/user.service'

export const isAuthenticated = new Elysia().derive(
  async ({ cookie, jwt }: any) => {
    if (!cookie!.token) {
      throw boom.unauthorized('You are not authenticated 1')
    }

    const { userId } = await jwt.verify(cookie.token)
    if (!userId) {
      throw boom.unauthorized('You are not authenticated 2')
    }

    const service = new UserService()
    try {
      const user = await service.findById(userId)
      if (!user.isActive) {
        throw boom.unauthorized('You are not authenticated 3')
      }
    } catch (error) {
      throw boom.unauthorized('You are not authenticated 4')
    }
  }
)
