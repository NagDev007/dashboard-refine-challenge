import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

class NotFoundError extends CustomAPIError {
  statusCode: number
  
  constructor(message = '') {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFoundError
