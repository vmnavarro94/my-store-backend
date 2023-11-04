import boom from '@hapi/boom'
import Products from '../models/product.model'
import type { Product as ProductType } from '../types/product.type'
import {
  mongoMutateErrorHandler,
  mongoFindErrorHandler
} from '../utils/mongoErrorHandling'
import { getImageUrls } from '../utils/getImageUrls'

class ProductService {
  constructor() {}

  async create({ images = [], json }: { images?: Blob[]; json: string }) {
    const data: ProductType = JSON.parse(json)
    const product = await Products.create(data).catch(mongoMutateErrorHandler)
    if (!images) return this.findById(product.id)

    const imageUrls = await getImageUrls(images)

    const updatedProduct = await Products.findByIdAndUpdate(
      { _id: product.id },
      { imageUrls },
      { new: true }
    ).catch((error: any) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    return updatedProduct
  }

  async find() {
    try {
      const products = await Products.find({ isFlash: false }).populate(
        'categories'
      )
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

  async update(
    id: ProductType['id'],
    { images, json }: { images: Blob[]; json: string }
  ) {
    const data: Partial<ProductType> = JSON.parse(json)
    delete data?.stockOnHand
    delete data?.stockOnStorage

    const imageUrls = await getImageUrls(images)

    const product = await Products.findByIdAndUpdate(
      { _id: id },
      { ...data, imageUrls },
      {
        new: true
      }
    )
      .populate('categories')
      .catch((error: any) => {
        mongoFindErrorHandler(error)
        mongoMutateErrorHandler(error)
      })

    if (product) return product

    throw boom.notFound('Product not found')
  }

  async delete(id: ProductType['id']) {
    const product = await Products.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    )
      .populate('categories')
      .catch((error) => {
        mongoFindErrorHandler(error)
        mongoMutateErrorHandler(error)
      })

    if (product) return product

    throw boom.notFound('Product not found')
  }

  async updateStock(
    id: ProductType['id'],
    {
      stockOnHand,
      stockOnStorage
    }: {
      stockOnHand?: ProductType['stockOnHand']
      stockOnStorage?: ProductType['stockOnStorage']
    }
  ) {
    const product = await Products.findByIdAndUpdate(
      { _id: id },
      { stockOnHand, stockOnStorage },
      {
        new: true
      }
    )
      .populate('categories')
      .catch((error: any) => {
        mongoFindErrorHandler(error)
        mongoMutateErrorHandler(error)
      })

    if (product) return product

    throw boom.notFound('Product not found')
  }
}

export default ProductService
