import { Request, Response, NextFunction } from 'express';
import http from 'http-status-codes';
import MailModel from '../model/mail.model';
import Mail from '../../../services/Mail.service';
import { MAIL_STATUS } from '../../../util/constants';
import ResponseFormatter from '../../../util/ResoponseFormatter';
import env from '../../../config/environment';
import SendEmail from './SendUpdateEmail.class';

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
        MAIL_STATUS.ADD,
        0
      );
      let sendEmailDetails = await Mail.sendMailMultiple({
        cc: req.body.cc,
        from: env.TWILLIO_VERIFIED_EMAIL + '',
        html: req.body.content,
        subject: req.body.subject,
        text: req.body.content,
        to: req.body.sendTo,
      });
      req.log.info(sendEmailDetails, ' Successfully Sending Emaill ');
      let updateMailStatusAndCount = await MailModel.update(
        {
          status: MAIL_STATUS.SUCCESS,
          sendCount: 1,
        },
        // @ts-ignore
        createResult.toJSON().id
      );
      req.log.debug(updateMailStatusAndCount);
      return ResponseFormatter.createResponse(
        res,
        http.ACCEPTED,
        'Mail added successfully',
        createResult.toJSON()
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
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      let getResult = await MailModel.getBySenderId(req.params['senderId']);
      return ResponseFormatter.createResponse(
        res,
        http.OK,
        'Mail details got successfully',
        getResult
      );
    } catch (e) {
      req.log.error(e, ' Error in getting the mail ');
      return ResponseFormatter.createResponse(
        res,
        http.INTERNAL_SERVER_ERROR,
        'Some error occured while getting mail data ',
        e
      );
    }
  }
  async getByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      let getResult = await MailModel.getByGivenAttribute({
        status: MAIL_STATUS.FAILED,
      });
      return ResponseFormatter.createResponse(
        res,
        http.OK,
        ' Fetched failed delivery details successfully! ',
        getResult
      );
    } catch (e) {
      req.log.error(e, ' error in getByStatus ');
      return ResponseFormatter.createResponse(
        res,
        http.INTERNAL_SERVER_ERROR,
        'Some error occured'
      );
    }
  }
  async sendFailedEmail(req: Request, res: Response, next: NextFunction) {
    try {
      let getByResult = await MailModel.getByGivenAttribute({
        status: MAIL_STATUS.FAILED,
      });
      getByResult.rows.forEach((row) => {
        let getAllDetails = row.get();
        SendEmail.sendEmail(getAllDetails.id, getAllDetails.sendCount, {
          cc: getAllDetails.cc,
          from: env.TWILLIO_VERIFIED_EMAIL + '',
          html: getAllDetails.content,
          subject: getAllDetails.subject,
          text: getAllDetails.content,
          to: getAllDetails.sendTo,
        })
          .then((d) => {
            req.log.debug(
              d,
              ' This mail has been sent successfully and updated to db'
            );
          })
          .catch((e) => {
            req.log.error(e, ' Error while sending email ');
          });
      });
      return ResponseFormatter.createResponse(
        res,
        http.OK,
        'Failed email retried successfully!',
        getByResult
      );
    } catch (e) {
      req.log.error(e, ' error in sendFailedEmail ');
      return ResponseFormatter.createResponse(res, http.INTERNAL_SERVER_ERROR);
    }
  }
}

export default new MailController();
