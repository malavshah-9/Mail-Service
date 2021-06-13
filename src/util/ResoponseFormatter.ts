import { Response } from 'express';
import httpStatus, { getReasonPhrase } from 'http-status-codes';

class CustomResponse {
  createResponse(
    res: Response,
    status: number = httpStatus.OK,
    message?: string,
    payload: any = {}
  ) {
    let actualPayload =
      typeof payload === 'object'
        ? {
            ...payload,
          }
        : payload;
    return res.status(status).json({
      message: message || getReasonPhrase(status),
      status,
      payload: actualPayload,
    });
  }
}
export default new CustomResponse();
