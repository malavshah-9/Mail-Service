import { Channel, ConsumeMessage } from 'amqplib';
import { logger } from '../../util/logger';
import RabbitMQConsumer from '../../services/Consumer.service';
import Mail from '../../services/Mail.service';
import env from '../../config/environment';

class RabbitMQ {
  async sendMessage(channel: Channel, queueMessage: ConsumeMessage | null) {
    try {
      if (queueMessage) {
        const sendEmailOptions = JSON.parse(queueMessage.content.toString());
        const sendEmail = await Mail.sendMailMultiple({
          cc: sendEmailOptions.cc,
          html: sendEmailOptions.html,
          subject: sendEmailOptions.subject,
          to: [sendEmailOptions.to],
          text: 'ASdasd',
          from: env.TWILLIO_VERIFIED_EMAIL + '',
        });
        logger.info(sendEmail, 'Email sent successfully!');
        await RabbitMQConsumer.ackMsg(channel, queueMessage);
        logger.info(' Message acknowledged successfully ');
      } else {
        logger.error({ queueMessage }, ' is Null ');
      }
    } catch (e) {
      await RabbitMQConsumer.ackMsg(channel, queueMessage);
      logger.error(e, ' Error in sendMessage ');
    }
  }
}

export default new RabbitMQ();
