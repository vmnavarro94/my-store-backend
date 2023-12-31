import boom from '@hapi/boom'
import Users from '../models/user.model'
import type { User as UserType, ToClientUser } from '../types/user.type'
import {
  mongoFindErrorHandler,
  mongoMutateErrorHandler
} from '../utils/mongoErrorHandling'

class UserService {
  constructor() {}

  getToClientUser = (user: UserType, toClientUser: ToClientUser) => {
    const newUser: Partial<ToClientUser> = {}

    for (let property in toClientUser) {
      if (user[property as keyof UserType] as keyof ToClientUser) {
        newUser[property as keyof ToClientUser] = user[
          property as keyof UserType
        ] as keyof ToClientUser
      }
    }

    return newUser
  }

  async create(data: UserType) {
    const user = await Users.create(data).catch(mongoMutateErrorHandler)
    return user
  }

  async find() {
    try {
      const users = await Users.find()
      return users.map((user) => user.toClient())
    } catch (error) {
      throw error
    }
  }

  async findByEmail(email: UserType['email']) {
    const user = await Users.findOne({ email })
      .select('password')
      .catch(mongoFindErrorHandler)

    if (user) return user

    throw boom.notFound('User not found')
  }

  async findById(id: UserType['id']) {
    const user = await Users.findById(id)
      .select('isActive permissions email name phoneNumber')
      .catch(mongoFindErrorHandler)

    if (user) return user

    throw boom.notFound('User not found')
  }

  async update(id: UserType['id'], data: UserType) {
    let toClientUser = (await this.findById(id)).toClient()
    const user = await Users.findOneAndUpdate(
      { _id: id },
      this.getToClientUser(data, toClientUser),
      {
        new: true
      }
    ).catch((error: any) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (user) return user

    throw boom.notFound('User not found')
  }
}

export default UserService
