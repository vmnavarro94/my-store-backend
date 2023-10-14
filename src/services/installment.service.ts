import boom from '@hapi/boom'
import Installments from '../models/installment.model'
import type { Installment } from '../types/installment.type'
import {
  mongoFindErrorHandler,
  mongoMutateErrorHandler
} from '../utils/mongoErrorHandling'

class InstallmentService {
  constructor() {}

  async create(data: Installment) {
    const installment = await Installments.create(data).catch(
      mongoMutateErrorHandler
    )
    return installment
  }

  async find() {
    try {
      const installments = await Installments.find()
      return installments
    } catch (error) {
      throw error
    }
  }

  async findById(id: Installment['id']) {
    const installment = await Installments.findById(id).catch(
      mongoFindErrorHandler
    )

    if (installment) return installment

    throw boom.notFound('Installment not found')
  }

  async delete(id: Installment['id']) {
    const installment = await Installments.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).catch((error) => {
      mongoFindErrorHandler(error)
      mongoMutateErrorHandler(error)
    })

    if (installment) return installment

    throw boom.notFound('Installment not found')
  }
}

export default InstallmentService
