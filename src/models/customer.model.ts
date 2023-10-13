import { Schema, model } from 'mongoose'
import type { Customer, CustomerModel } from '../types/customer.type'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../utils/constants'

const Customers = new Schema<Customer, CustomerModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true,
    unique: true,
    match: [PHONE_NUMBER_REGEX, 'Please provide a valid phone number']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
    match: [EMAIL_REGEX, 'Please provide a valid email']
  },
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ],
  storeCredit: {
    type: Number,
    default: () => 0
  },
  createDate: {
    type: Number,
    default: () => Date.now()
  },
  lastModifiedDate: {
    type: Number,
    default: () => Date.now()
  },
  active: {
    type: Boolean,
    default: () => true
  }
})

export default model('Customer', Customers)
