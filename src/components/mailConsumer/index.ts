import { Channel, ConsumeMessage } from 'amqplib';
import MailModel from '../mail/model/mail.model';
import { logger } from '../../util/logger';
import RabbitMQConsumer from '../../services/Consumer.service';
import Mail from '../../services/Mail.service';
import env from '../../config/environment';
import { MAIL_STATUS } from '../../util/constants';

class RabbitMQ {
  async sendMessage(channel: Channel, queueMessage: ConsumeMessage | null) {
    let sendEmailId;
    try {
      if (queueMessage) {
        const sendEmailOptions = JSON.parse(queueMessage.content.toString());
        logger.info(sendEmailOptions);
        const mailCreateResult = await MailModel.create(
          sendEmailOptions.subject,
          sendEmailOptions.html,
          sendEmailOptions.to,
          sendEmailOptions.cc,
          sendEmailOptions.mailBy,
          sendEmailOptions.senderId,
          MAIL_STATUS.ADD
        );
        const sendEmail = await Mail.sendMailMultiple({
          cc: sendEmailOptions.cc,
          html: sendEmailOptions.html,
          subject: sendEmailOptions.subject,
          to: sendEmailOptions.to,
          text: 'ASdasd',
          from: env.TWILLIO_VERIFIED_EMAIL + '',
        });
        logger.info(sendEmail, 'Email sent successfully!');
        // @ts-ignore
        sendEmailId = mailCreateResult.toJSON().id;
        const updateEmailStatus = await MailModel.update(
          MAIL_STATUS.SUCCESS,
          // @ts-ignore
          mailCreateResult.toJSON().id
        );
        logger.info(updateEmailStatus, ' Email status updated! ');
        await RabbitMQConsumer.ackMsg(channel, queueMessage);
        logger.info(' Message acknowledged successfully ');
      } else {
        logger.error({ queueMessage }, ' is Null ');
      }
    } catch (e) {
      if (sendEmailId) {
        const updateEmailStatus = await MailModel.update(
          MAIL_STATUS.FAILED,
          // @ts-ignore
          sendEmailId
        );
        logger.info(updateEmailStatus, ' Email status updated! ');
      }
      await RabbitMQConsumer.ackMsg(channel, queueMessage);
      logger.error(e, ' Error in sendMessage ');
    }
  }
}

export default new RabbitMQ();
