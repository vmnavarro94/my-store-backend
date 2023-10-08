import { Schema, model } from 'mongoose'
import { Product, ProductModel } from '../types/product.type'
import { IMAGE_URL_REGEX } from '../utils/constants'

const Products = new Schema<Product, ProductModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  cost: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  imageUrls: [
    {
      type: String,
      match: [IMAGE_URL_REGEX, 'Please provide a valid image url']
    }
  ],
  barCode: {
    type: Number
  },
  stockOnHand: {
    type: Number,
    default: () => 0
  },
  stockOnStorage: {
    type: Number,
    default: () => 0
  },
  reducedPrice: {
    type: Number
  },
  isOnSale: {
    type: Boolean,
    default: () => false
  },
  isActive: {
    type: Boolean,
    default: () => true
  }
})

export default model('Product', Products)
