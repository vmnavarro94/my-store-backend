import type { Model, Schema } from 'mongoose'
import type { Product } from './product.type'
import type { PaymentMethod } from './payment.type'

// Schema.Types.ObjectId[] | Product[]

export type Transaction = {
  id: string
  products: [{ product: Schema.Types.ObjectId | Product; quantity: number }]
  seller: Schema.Types.ObjectId
  createDate: number
  lastModifiedDate: number
  paymentMethods: PaymentMethod[]
  total: number
  subtotal: number
  profit: number
  installments: Schema.Types.ObjectId[]
  customer?: Schema.Types.ObjectId
  observation?: string
  isActive: boolean
}

export type TransactionModel = Model<Transaction>
