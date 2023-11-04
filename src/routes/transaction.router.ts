import { Elysia } from 'elysia'
import { Transaction } from '../types/transaction.type'
import TransactionService from '../services/transaction.service'
import { isAuthenticated } from '../middlewares/auth.handler'

const service = new TransactionService()

export const transactionRouter = new Elysia().group('/transactions', (app) =>
  app
    .use(isAuthenticated)
    .get('/', async ({ set }) => {
      const transactions = await service.find()
      set.status = 200
      return transactions
    })
    .get('/:id', async ({ params: { id }, set }) => {
      const transaction = await service.findById(id)
      set.status = 200
      return transaction
    })
    .post('/', async ({ body, set }) => {
      const newTransaction = await service.create(body as Transaction)
      set.status = 201
      return newTransaction
    })
    .delete('/:id', async ({ params: { id }, set }) => {
      const deletedTransaction = await service.delete(id)
      set.status = 200
      return deletedTransaction
    })
)
