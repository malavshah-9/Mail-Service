import Publisher from './publisher-demo';
import env from '../src/config/environment';
import { logger } from '../src/util/logger';
import { SendMailOptions } from '../src/types/Mail.types';

async function startSending() {
  let emailOptions: SendMailOptions = {
    cc: ['mdshah9574@gmail.com', 'jackjonesshah@gmail.com'],
    subject: ' Sending Email from Publisher',
    html: '<b>Hello World From Publisher</b>',
    to: 'mdshah9574@gmail.com',
    from: '',
    text: 'asds',
  };
  await Publisher.initConnection();
  let rabbitChannel = Publisher.getChannel();
  let sendMessage = rabbitChannel.sendToQueue(
    env.RABBITMQ_CHANNEL_NAME + '',
    Buffer.from(JSON.stringify(emailOptions))
  );
  if (sendMessage) {
    logger.info(
      emailOptions,
      `Message has been sent successfully to the queue `
    );
  }
}

startSending();
