import boom from '@hapi/boom'
import UserService from './user.service'
import { User as UserType } from '../types/user.type'

export type LoginParams = {
  userName: UserType['email']
  password: UserType['password']
}

class AuthService {
  userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  async login({ userName, password }: LoginParams) {
    if (!userName || !password) throw boom.badData('Missing credentials')
    const user = await this.userService.findByEmail(userName)
    const isMatch = await Bun.password.verify(password, user.password)

    if (isMatch) return user

    throw boom.unauthorized('Invalid credentials')
  }
}

export default AuthService
