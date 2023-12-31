import { Schema, model } from 'mongoose'
import { Category, CategoryModel } from '../types/category.type'
import { IMAGE_URL_REGEX } from '../utils/constants'

const Categories = new Schema<Category, CategoryModel>({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    match: [IMAGE_URL_REGEX, 'Please provide a valid image url']
  },
  isActive: {
    type: Boolean,
    default: () => true
  }
})

export default model('Category', Categories)
