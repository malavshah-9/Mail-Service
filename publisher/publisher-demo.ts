import amqlib, {
  Connection,
  Channel,
  ConsumeMessage,
  Message,
  Replies,
} from 'amqplib';
import dotenv from 'dotenv';
import { logger } from '../src/util/logger';
dotenv.config();
import env from '../src/config/environment';

class Publisher {
  rabbitConnection: Connection;
  rabbitChannel: Channel;
  constructor() {}
  async initConnection() {
    try {
      this.rabbitConnection = await amqlib.connect(
        `amqp://${env.RABBITMQ_HOST}:${env.RABBITMQ_PORT}`
      );
      this.rabbitChannel = await this.rabbitConnection.createChannel();
      await this.rabbitChannel.assertQueue(env.RABBITMQ_CHANNEL_NAME + '', {
        durable: true,
      });
      logger.info(' RabbitMQ connection initialized successfully ');
    } catch (e) {
      logger.error(e, ' Error in initConnection ');
    }
  }
  async closeConnection() {
    try {
      if (this.rabbitChannel) {
        await this.rabbitChannel.close();
        await this.rabbitConnection.close();
        return;
      } else {
        logger.info(' No RabbitMQ Connection or Channel found to close ');
      }
    } catch (e) {
      logger.error(e, 'Error while closing rabbitmq Connection ');
    }
  }
  getChannel() {
    return this.rabbitChannel;
  }
}
export default new Publisher();
