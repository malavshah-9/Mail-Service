import { Request, Response, NextFunction } from 'express';
import http from 'http-status-codes';
import MailModel from '../model/mail.model';
import { MAIL_STATUS } from '../../../util/constants';
import ResponseFormatter from '../../../util/ResoponseFormatter';

class MailController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let createResult = await MailModel.create(
        req.body.subject,
        req.body.content,
        req.body.sendTo,
        req.body.cc,
        req.body.mailBy,
        req.body.senderId,
        MAIL_STATUS.ADD
      );
      return ResponseFormatter.createResponse(
        res,
        http.ACCEPTED,
        'Mail added successfully',
        createResult.toJSON
      );
    } catch (e) {
      req.log.error(e, 'Error in create of MailController');
      return ResponseFormatter.createResponse(
        res,
        http.INTERNAL_SERVER_ERROR,
        'Some error occured while adding mail',
        e
      );
    }
  }
}

export default new MailController();
