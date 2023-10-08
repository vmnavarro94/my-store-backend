import { Elysia } from 'elysia'
import { Product } from '../types/product.type'
import ProductService from '../services/product.service'
import { isAuthenticated } from '../middlewares/auth.handler'

const service = new ProductService()

export const productRouter = (app: Elysia) =>
  app.group('/products', (app) =>
    app
      .use(isAuthenticated)
      .post('/', async ({ body, set }) => {
        const newProduct = await service.create(body as Product)
        set.status = 201
        return newProduct
      })
      .get('/', async ({ set }) => {
        const products = await service.find()
        set.status = 200
        return products
      })
      .get('/:id', async ({ params: { id }, set }) => {
        const product = await service.findById(id)
        set.status = 200
        return product
      })
      .patch('/:id', async ({ params: { id }, body: product, set }) => {
        const updatedProducts = await service.update(id, product as Product)
        set.status = 200
        return updatedProducts
      })
      .delete('/:id', async ({ params: { id }, set }) => {
        const deletedProduct = await service.delete(id)
        set.status = 200
        return deletedProduct
      })
  )
