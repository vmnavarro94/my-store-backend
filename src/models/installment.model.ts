import { Schema, model } from 'mongoose'
import { Installment, InstallmentModel } from '../types/installment.type'

const Installments = new Schema<Installment, InstallmentModel>({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true
  },
  createDateTime: {
    type: Number,
    default: () => Date.now()
  },
  lastModifiedDateTime: {
    type: Number,
    default: () => Date.now()
  },
  isActive: {
    type: Boolean,
    default: () => true
  }
})

export default model('Installment', Installments)
