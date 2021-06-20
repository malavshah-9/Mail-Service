import Publisher from './publisher-demo';
import env from '../src/config/environment';
import { logger } from '../src/util/logger';

async function startSending() {
  let message = 'Hello 1233';
  await Publisher.initConnection();
  let rabbitChannel = Publisher.getChannel();
  let sendMessage = rabbitChannel.sendToQueue(
    env.RABBITMQ_CHANNEL_NAME + '',
    Buffer.from(message)
  );
  if (sendMessage) {
    logger.info(
      `${JSON.stringify(message)} has been sent successfully to the queue `
    );
  }
}

startSending();
