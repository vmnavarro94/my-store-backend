import { Elysia } from 'elysia'
import type { Customer } from '../types/customer.type'
import CustomerService from '../services/customer.service'
import { isAuthenticated } from '../middlewares/auth.handler'

const service = new CustomerService()

export const customerRouter = (app: Elysia) =>
  app.group('/customers', (app) =>
    app
      .use(isAuthenticated)
      .get('/', async ({ set }) => {
        const customers = await service.find()
        set.status = 200
        return customers
      })
      .get('/:id', async ({ params: { id }, set }) => {
        const customer = await service.findById(id)
        set.status = 200
        return customer
      })
      .post('/', async ({ body, set }) => {
        const newCustomer = await service.create(body as Customer)
        set.status = 201
        return newCustomer
      })
      .patch('/:id', async ({ params: { id }, body: customer, set }) => {
        const updatedCustomer = await service.update(id, customer as Customer)
        set.status = 200
        return updatedCustomer
      })
      .delete('/:id', async ({ params: { id }, set }) => {
        const deletedCustomer = await service.delete(id)
        set.status = 200
        return deletedCustomer
      })
  )
