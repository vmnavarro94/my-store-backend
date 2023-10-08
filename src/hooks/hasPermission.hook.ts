import { Permission } from '../types/permission.type'
import UserService from '../services/user.service'
import boom from '@hapi/boom'

const hasPermissions =
  (permissions: Permission[]) =>
  async ({ cookie, jwt }: any) => {
    const { userId } = await jwt.verify(cookie.token)
    const userService = new UserService()

    const user = await userService.findById(userId)
    if (user.permissions?.includes(Permission.ADMINISTRATOR)) return

    if (
      !user.permissions?.some((permission) => permissions.includes(permission))
    )
      throw boom.unauthorized('You are not authorized to perform this action')
  }

export default hasPermissions
