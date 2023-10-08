import type { Model } from 'mongoose'
import { Permission } from './permission.type'

export type User = ToClientUser & {
  password: string
  activeUser: boolean
  createdDate: number
  lastModifiedDate: number
  permissions?: Permission[]
}

export type ToClientUser = {
  id: string
  name: string
  email: string
  phoneNumber: string
}

export type UserMethods = {
  toClient: () => ToClientUser
}

export type UserModel = Model<User, {}, UserMethods>
