import { Channel } from 'amqplib';
import RabbitMQ from '../services/Consumer.service';
export default function (channel: Channel) {
  RabbitMQ.consumeChannel(channel, (msg) => {
    console.log(msg?.content);
  });
}
