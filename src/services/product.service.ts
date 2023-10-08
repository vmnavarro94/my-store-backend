import boom from '@hapi/boom'
import Products from '../models/product.model'
import type { Product as ProductType } from '../types/product.type'
import {
  mongoMutateErrorHandler,
  mongoFindErrorHandler
} from '../utils/mongoErrorHandling'

class ProductService {
  constructor() {}

  async create(data: ProductType) {
    const product = await Products.create(data).catch(mongoMutateErrorHandler)
    return this.findById(product.id)
  }

  async find() {
    try {
      const products = await Products.find().populate('categories')
      return products
    } catch (error) {
      throw error
    }
  }

  async findById(id: ProductType['id']) {
    const product = await Products.findById(id)
      .populate('categories')
      .catch(mongoFindErrorHandler)

    if (product) return product

    throw boom.notFound('Product not found')
  }

  async update(id: ProductType['id'], data: ProductType) {
    const product = await Products.findByIdAndUpdate({ _id: id }, data, {
      new: true
    })
      .populate('categories')
      .catch((error: any) => {
        mongoFindErrorHandler(error)
        mongoMutateErrorHandler(error)
      })

    if (product) return product

    throw boom.notFound('Product not found')
  }

  async delete(id: ProductType['id']) {
    const product = await Products.findOneAndDelete({ _id: id })
      .populate('categories')
      .catch((error) => {
        mongoFindErrorHandler(error)
        mongoMutateErrorHandler(error)
      })

    if (product) return product

    throw boom.notFound('Product not found')
  }
}

export default ProductService
