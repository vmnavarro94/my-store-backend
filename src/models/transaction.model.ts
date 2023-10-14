import { Schema, model } from 'mongoose'
import { Transaction, TransactionModel } from '../types/transaction.type'
import { Payment } from '../types/payment.type'

const Transactions = new Schema<Transaction, TransactionModel>({
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createDate: {
    type: Number,
    default: () => Date.now()
  },
  lastModifiedDate: {
    type: Number,
    default: () => Date.now()
  },
  paymentMethods: {
    type: [String],
    enum: Object.values(Payment),
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  installments: {
    type: [Schema.Types.ObjectId],
    ref: 'Installment'
  },
  customer: {
    type: [Schema.Types.ObjectId],
    ref: 'Customer'
  },
  observation: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: () => true
  }
})

export default model('Transaction', Transactions)
