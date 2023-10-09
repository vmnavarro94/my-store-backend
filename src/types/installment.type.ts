import { Model } from 'mongoose'
import type { User } from './user.type'

export type Installment = {
  id: string
  seller: User
  amount: number
  createDateTime: number
  lastModifiedDateTime: number
  active: boolean
}

export type InstallmentModel = Model<Installment>
