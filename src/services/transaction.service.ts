import boom from '@hapi/boom'
import { Schema } from 'mongoose'
import Transactions from '../models/transaction.model'
import {
  mongoFindErrorHandler,
  mongoMutateErrorHandler
} from '../utils/mongoErrorHandling'
import ProductService from './product.service'
import type { Transaction } from '../types/transaction.type'
import type { Product } from '../types/product.type'

export type InventoryProduct = {
  product: Schema.Types.ObjectId
  quantity: number
}

class TransactionService {
  constructor() {}

  async create(data: Transaction) {
    const { inventoryProducts, flashProducts } = data.products.reduce(
      (products, currentProduct) => {
        if (typeof currentProduct.product === 'string') {
          products.inventoryProducts.push(currentProduct as InventoryProduct)
        } else {
          products.flashProducts.push(currentProduct as unknown as Product)
        }

        return products
      },
      { inventoryProducts: [], flashProducts: [] } as {
        inventoryProducts: InventoryProduct[]
        flashProducts: Product[]
      }
    )
    //TOOD: Calculate total based on tax, for now total and subtotal are the same
    let subtotal = 0
    let profit = 0
    const productService = new ProductService()

    const registeredFlashProducts = await Promise.all(
      flashProducts.map(async ({ description, price }) => {
        const productJson = JSON.stringify({
          name: description,
          description: `Flash product, sold on ${new Date()}`,
          price,
          isFlash: true
        })
        const newProduct = await productService.create({
          json: productJson
        })
        subtotal += price

        return { product: newProduct?.id, quantity: 1 }
      })
    )

    for (let { product: productId, quantity } of inventoryProducts) {
      const product = await productService.findById(
        productId as unknown as Product['id']
      )
      const productSubTotal = product.price * quantity
      //If cost is not defined, profit is not calculated
      const productProfit = product.cost
        ? productSubTotal - product.cost * quantity
        : 0

      subtotal += productSubTotal
      profit += productProfit
    }

    const transactionData = {
      ...data,
      total: subtotal,
      subtotal,
      profit,
      products: [...registeredFlashProducts, ...inventoryProducts]
    }

    const transaction = await Transactions.create(transactionData).catch(
      mongoMutateErrorHandler
    )

    return this.findById(transaction.id)
  }

  async find() {
    const transactions = await Transactions.find()
      .populate('seller')
      .populate('products.product')
      .catch((error) => {
        throw error
      })
    return transactions
  }

  async findById(id: Transaction['id']) {
    const transaction = await Transactions.findById(id)
      .populate('seller')
      .populate('products.product')
      .catch(mongoFindErrorHandler)

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
