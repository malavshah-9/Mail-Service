import { Channel } from 'amqplib';
import RabbitMQ from '../services/Consumer.service';
import MailConsumer from '../components/mailConsumer';
export default function (channel: Channel) {
  RabbitMQ.consumeChannel(channel, async (msg) => {
    await MailConsumer.sendMessage(channel, msg);
  });
}
