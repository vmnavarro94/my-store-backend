export enum Payment {
  CASH = 'cash',
  CREDIT_CARD = 'creditCard',
  DEBIT_CARD = 'debitCard',
  STORE_CREDIT = 'storeCredit',
  OTHER = 'other'
}

export type PaymentMethod = {
  method: Payment
  amount: number
}
