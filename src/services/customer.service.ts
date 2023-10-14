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
    const customers = await Customers.find({ isActive: true }).catch(
      (error) => {
        throw error
      }
    )

    return customers
  }

  async findById(id: Customer['id']) {
    const customer = await Customers.findOne({ _id: id, isActive: true }).catch(
      mongoFindErrorHandler
    )

    if (customer) return customer

    throw boom.notFound('Customer not found')
  }

  async update(id: Customer['id'], data: Partial<Customer>) {
    delete data?.isActive
    const customer = await Customers.findOneAndUpdate(
      { _id: id, isActive: true },
      data,
      {
        new: true
      }
    ).catch((error: any) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (customer) return customer

    throw boom.notFound('Customer not found')
  }

  async delete(id: Customer['id']) {
    const customer = await Customers.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).catch((error) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (customer) return customer

    throw boom.notFound('Customer not found')
  }

  async reActivateCustomer(id: Customer['id']) {
    const customer = await Customers.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    ).catch((error) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (customer) return customer

    throw boom.notFound('Customer not found')
  }
}

export default CustomerService
