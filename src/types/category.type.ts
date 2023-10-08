import type { Model } from 'mongoose'

export type Category = {
  id: string
  name: string
  description?: string
  imageUrl?: string
}

export type CategoryModel = Model<Category>
