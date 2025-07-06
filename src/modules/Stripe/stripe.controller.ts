
import httpStatus from 'http-status';

import { catchAsync } from '@/utils/catchAsync';
import { sendResponse } from '@/utils/sendResponse';

import { StripeService } from './stripe.service';

const createPaymentIntent = catchAsync(async (req, res) => {
  const result = await StripeService.createPaymentIntent(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent created successfully',
    data: result,
  });
});

export const StripeController = {
  createPaymentIntent,
};
