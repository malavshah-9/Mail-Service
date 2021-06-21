import sg from '@sendgrid/mail';
import env from '../config/environment';
import { SendMailOptions } from '../types/Mail.types';
import { logger } from '../util/logger';

class Mail {
  constructor() {
    sg.setApiKey(env.TWILLIO_API_KEY + '');
  }
  async sendMail(sendEmail: SendMailOptions) {
    try {
      let mailDetails = await sg.send(sendEmail);
      return mailDetails;
    } catch (e) {
      logger.error(e, ' Error in sending email in sendMail of Mail Service ');
      throw e;
    }
  }
  async sendMailMultiple(sendEmail: SendMailOptions) {
    try {
      //  @ts-ignore
      let multiEmailResponse = await sg.sendMultiple(sendEmail);
      return multiEmailResponse;
    } catch (e) {
      logger.error(
        e,
        ' Error in sending email in sendMailMultiple of Mail Service '
      );
      throw e;
    }
  }
}

export default new Mail();
