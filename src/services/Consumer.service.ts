import amqlib, {
  Connection,
  Channel,
  ConsumeMessage,
  Message,
  Replies,
} from 'amqplib';
import env from '../config/environment';

class Consumer {
  rabbitConnection: Connection;
  constructor() {}
  async initConnection(): Promise<Channel> {
    try {
      this.rabbitConnection = await amqlib.connect('amqp://localhost:5672');
      let rabbitChannel = await this.rabbitConnection.createChannel();
      await rabbitChannel.assertQueue(env.RABBITMQ_CHANNEL_NAME + '', {
        durable: true,
      });
      return rabbitChannel;
    } catch (e) {
      throw new Error(e);
    }
  }
  async consumeChannel(
    rabbitChannel: Channel,
    fn: (msg: ConsumeMessage | null) => void
  ): Promise<Replies.Consume> {
    if (rabbitChannel) {
      let consumer = await rabbitChannel.consume(
        env.RABBITMQ_CHANNEL_NAME + '',
        fn
      );
      return consumer;
    } else {
      throw new Error('Channel not found while consuming ');
    }
  }
  async ackMsg(rabbitChannel: Channel, msg: Message) {
    if (rabbitChannel) {
      await rabbitChannel.ack(msg);
      return;
    } else {
      throw new Error('Channel not found while acknowledging ');
    }
  }
  async closeConnection(rabbitChannel: Channel) {
    try {
      if (rabbitChannel) {
        await rabbitChannel.close();
        await this.rabbitConnection.close();
        return;
      } else {
        throw new Error(' No RabbitMQ Connection or Channel found to close ');
      }
    } catch (e) {
      throw e;
    }
  }
}

export default new Consumer();
