import boom from '@hapi/boom'
import Customers from '../models/customer.model'
import type { Customer } from '../types/customer.type'
import {
  mongoFindErrorHandler,
  mongoMutateErrorHandler
} from '../utils/mongoErrorHandling'

class CustomerService {
  constructor() {}

  async create(data: Customer) {
    const customer = await Customers.create(data).catch(mongoMutateErrorHandler)

    return customer
  }

  async find() {
    const customers = await Customers.find().catch((error) => {
      throw error
    })

    return customers
  }

  async findById(id: Customer['id']) {
    const customer = await Customers.findById(id).catch(mongoFindErrorHandler)

    if (customer) return customer

    throw boom.notFound('Customer not found')
  }

  async update(id: Customer['id'], data: Customer) {
    const customer = await Customers.findByIdAndUpdate(id, data, {
      new: true
    }).catch((error: any) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (customer) return customer

    throw boom.notFound('Customer not found')
  }

  async delete(id: Customer['id']) {
    const customer = await Customers.findByIdAndDelete(id).catch(
      (error: any) => {
        mongoFindErrorHandler(error)
        mongoMutateErrorHandler(error)
      }
    )

    if (customer) return customer

    throw boom.notFound('Customer not found')
  }
}

export default CustomerService
