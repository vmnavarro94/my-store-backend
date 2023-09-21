import { Boom } from '@hapi/boom'

const logErrors = (error: any) => {
  console.log(error)
}

const boomErrorHandler = (error: Boom, set: any) => {
  const { output } = error
  console.log(output)
  set.status = output.statusCode
  return output.payload
}

const errorHandler = (error: Error, set: any) => {
  set.status = 500
  return {
    message: error.message,
    stack: error.stack
  }
}

type ElysiaErrorHandlerParams = {
  error: Error
  set: any
}
const elysiaErrorHandler = ({ error, set }: ElysiaErrorHandlerParams) => {
  logErrors(error)
  if ((error as Boom).isBoom) {
    return boomErrorHandler(error as Boom, set)
  } else {
    return errorHandler(error, set)
  }
}

export { elysiaErrorHandler }
