import boom from '@hapi/boom'

export const mongoFindErrorHandler = (error: any) => {
  switch (error.code) {
    default:
      throw boom.badGateway('There was an error trying to find the user')
  }
}

export const mongoMutateErrorHandler = (error: any) => {
  switch (error.code) {
    case 11000:
      throw boom.badData('Email already exists')
    default:
      throw boom.badGateway('There was an error trying to save the data')
  }
}
