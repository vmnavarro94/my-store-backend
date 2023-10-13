import type { Model } from 'mongoose'
import type { Transaction } from './transaction.type'

export type Customer = {
  id: string
  name: string
  lastName: string
  phoneNumber?: string
  email: string
  history?: Transaction['id'][]
  storeCredit: number
  createDate: number
  lastModifiedDate: number
  active: boolean
}

export type CustomerModel = Model<Customer>
