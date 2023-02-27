import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

class UnAuthenticatedError extends CustomAPIError {
  statusCode: number
  
  constructor(message = '') {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnAuthenticatedError
