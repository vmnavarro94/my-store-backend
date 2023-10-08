import { Elysia } from 'elysia'
import { Product } from '../types/product.type'
import ProductService from '../services/product.service'
import { isAuthenticated } from '../middlewares/auth.handler'
import { hasPermission } from '../hooks'
import { Permission } from '../types/permission.type'

const service = new ProductService()

export const productRouter = (app: Elysia) =>
  app.group('/products', (app) =>
    app
      .use(isAuthenticated)
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
      .patch(
        '/stock/:id',
        async ({ params: { id }, body: stock, set }) => {
          const updatedProducts = await service.updateStock(
            id,
            stock as {
              stockOnHand?: Product['stockOnHand']
              stockOnStorage?: Product['stockOnStorage']
            }
          )
          set.status = 200
          return updatedProducts
        },
        { beforeHandle: hasPermission([Permission.MANAGE_INVENTORY]) }
      )
      .guard(
        {
          beforeHandle: hasPermission([Permission.MANAGE_PRODUCTS])
        },
        (app) =>
          app
            .post('/', async ({ body, set }) => {
              const newProduct = await service.create(body as Product)
              set.status = 201
              return newProduct
            })
            .patch('/:id', async ({ params: { id }, body: product, set }) => {
              const updatedProducts = await service.update(
                id,
                product as Product
              )
              set.status = 200
              return updatedProducts
            })
            .delete('/:id', async ({ params: { id }, set }) => {
              const deletedProduct = await service.delete(id)
              set.status = 200
              return deletedProduct
            })
      )
  )
