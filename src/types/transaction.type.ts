import type { Model, Schema } from 'mongoose'

export type Transaction = {
  id: string
  products: Schema.Types.ObjectId[]
  seller: Schema.Types.ObjectId
  createDate: number
  lastModifiedDate: number
  paymentMethods: string[]
  total: number
  subtotal: number
  profit: number
  installments: Schema.Types.ObjectId[]
  customer?: Schema.Types.ObjectId
  observation?: string
  isActive: boolean
}

export type TransactionModel = Model<Transaction>
