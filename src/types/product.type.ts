import type { Model } from 'mongoose'
import type { Category as CategoryType } from './category.type'

export type Product = {
  id: string
  name: string
  description?: string
  categories?: CategoryType['id'][]
  cost?: number
  price: number
  imageUrls?: string[]
  barCode?: number
  stockOnHand: number
  stockOnStorage: number
  reducedPrice?: number
  isOnSale: boolean
  isActive: boolean
}

export type ProductModel = Model<Product>
