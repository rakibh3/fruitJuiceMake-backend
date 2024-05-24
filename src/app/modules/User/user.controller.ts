import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { UserService } from './user.service'

const userLogin = catchAsync(async (req, res) => {
  const result = await UserService.userLoginIntoBD(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User login successfully',
    data: result,
  })
})

export const UserController = {
  userLogin,
}
