import boom from '@hapi/boom'
import Categories from '../models/category.model'
import type { Category as CategoryType } from '../types/category.type'
import {
  mongoFindErrorHandler,
  mongoMutateErrorHandler
} from '../utils/mongoErrorHandling'
import ImageService from './image.service'

class CategoryService {
  constructor() {}

  async create({ image, json }: { image: Blob; json: string }) {
    const data: CategoryType = JSON.parse(json)
    const category = await Categories.create(data).catch(
      mongoMutateErrorHandler
    )
    if (!image) return category

    const imageService = new ImageService()
    const imageUrl = await imageService.saveImage(image)

    const updatedCategory = await Categories.findByIdAndUpdate(
      { _id: category.id },
      {
        imageUrl
      },
      { new: true }
    ).catch((error: any) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    return updatedCategory
  }

  async find() {
    try {
      const categories = await Categories.find({ isActive: true })
      return categories
    } catch (error) {
      throw error
    }
  }

  async findById(id: CategoryType['id']) {
    const category = await Categories.findById(id).catch(mongoFindErrorHandler)

    if (category) return category

    throw boom.notFound('Category not found')
  }

  async update(
    id: CategoryType['id'],
    { image, json }: { image: Blob; json: string }
  ) {
    const data: Partial<CategoryType> = JSON.parse(json)
    delete data?.isActive
    const imageService = new ImageService()
    const imageUrl = await imageService.saveImage(image)

    const category = await Categories.findByIdAndUpdate(
      { _id: id },
      { ...data, imageUrl },
      {
        new: true
      }
    ).catch((error: any) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (category) return category

    throw boom.notFound('Category not found')
  }

  async delete(id: CategoryType['id']) {
    const category = await Categories.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).catch((error) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (category) return category

    throw boom.notFound('Category not found')
  }
}

export default CategoryService
