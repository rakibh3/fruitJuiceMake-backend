import { NextFunction, Request, Response } from 'express'

export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  return res.status(500).json({
    success: false,
    message: error.message || 'Something Went Wrong!',
    error: error,
  })
}
