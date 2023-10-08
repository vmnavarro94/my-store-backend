import boom from '@hapi/boom'
import Categories from '../models/category.model'
import type { Category as CategoryType } from '../types/category.type'
import {
  mongoFindErrorHandler,
  mongoMutateErrorHandler
} from '../utils/mongoErrorHandling'

class CategoryService {
  constructor() {}

  async create(data: CategoryType) {
    const category = await Categories.create(data).catch(
      mongoMutateErrorHandler
    )
    return category
  }

  async find() {
    try {
      const categories = await Categories.find()
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

  async update(id: CategoryType['id'], data: CategoryType) {
    const category = await Categories.findByIdAndUpdate({ _id: id }, data, {
      new: true
    }).catch((error: any) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (category) return category

    throw boom.notFound('Category not found')
  }

  async delete(id: CategoryType['id']) {
    const category = await Categories.findOneAndDelete({ _id: id }).catch(
      (error) => {
        mongoFindErrorHandler(error)
        mongoMutateErrorHandler(error)
      }
    )

    if (category) return category

    throw boom.notFound('Category not found')
  }
}

export default CategoryService
