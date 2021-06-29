import Mail from '../../../services/Mail.service';
import MailModel from '../model/mail.model';
import { MAIL_STATUS } from '../../../util/constants';
import { logger } from '../../../util/logger';
import { SendMailOptions } from '../../../types/Mail.types';

class SendEmail {
  async sendEmail(
    id: String,
    currentCount: number,
    mailOptions: SendMailOptions
  ) {
    try {
      const sendEmailDetails = await Mail.sendMailMultiple(mailOptions);
      const updatedDetails = await MailModel.update(
        {
          status: MAIL_STATUS.SUCCESS,
          sendCount: parseInt(currentCount + '') + 1,
        },
        id
      );
      return {
        updatedDetails,
        sendEmailDetails,
      };
    } catch (e) {
      logger.error(' error in sendEmail of SendUpdateEmail.class.ts ', e);
      const updatedDetails = await MailModel.update(
        {
          status: MAIL_STATUS.FAILED,
          sendCount: parseInt(currentCount + '') + 1,
        },
        id
      );
      throw e;
    }
  }
}

export default new SendEmail();
