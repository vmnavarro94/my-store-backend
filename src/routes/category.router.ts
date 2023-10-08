import { Elysia } from 'elysia'
import { Category as CategoryType } from '../types/category.type'
import CategoryService from '../services/category.service'
import { isAuthenticated } from '../middlewares/auth.handler'

const service = new CategoryService()

export const categoryRouter = (app: Elysia) =>
  app.group('/categories', (app) =>
    app
      .use(isAuthenticated)
      .post('/', async ({ body, set }) => {
        const newCategory = await service.create(body as CategoryType)
        set.status = 201
        return newCategory
      })
      .get('/', async ({ set }) => {
        const categories = await service.find()
        set.status = 200
        return categories
      })
      .get('/:id', async ({ params: { id }, set }) => {
        const category = await service.findById(id)
        set.status = 200
        return category
      })
      .patch('/:id', async ({ params: { id }, body: category, set }) => {
        const updatedCategory = await service.update(
          id,
          category as CategoryType
        )
        set.status = 200
        return updatedCategory
      })
      .delete('/:id', async ({ params: { id }, set }) => {
        const deletedCategory = await service.delete(id)
        set.status = 200
        return deletedCategory
      })
  )