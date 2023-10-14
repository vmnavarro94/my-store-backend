import boom from '@hapi/boom'
import Transactions from '../models/transaction.model'
import type { Transaction } from '../types/transaction.type'
import {
  mongoFindErrorHandler,
  mongoMutateErrorHandler
} from '../utils/mongoErrorHandling'

class TransactionService {
  constructor() {}

  async create(data: Transaction) {
    const transaction = await Transactions.create(data).catch(
      mongoMutateErrorHandler
    )
    return transaction
  }

  async find() {
    const transactions = await Transactions.find().catch((error) => {
      throw error
    })
    return transactions
  }

  async findById(id: Transaction['id']) {
    const transaction = await Transactions.findById(id).catch(
      mongoFindErrorHandler
    )

    if (transaction) return transaction

    throw boom.notFound('Transaction not found')
  }

  async delete(id: Transaction['id']) {
    const transaction = Transactions.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).catch((error) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (transaction) return transaction

    throw boom.notFound('Transaction not found')
  }
}

export default TransactionService
