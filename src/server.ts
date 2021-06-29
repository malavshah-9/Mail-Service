import { createServer } from 'http';
import db from './util/dbConfig';
import env from './config/environment';
import RabbitMQConsumer from './services/Consumer.service';
import app from './app';
import rabbitMiddlewares from './rabbitMiddlewares';
import { logger } from './util/logger';

const server = createServer(app);

(async () => {
  try {
    await authenticateDB();
    logger.info(' Database server initiazlied successfully');
    const rabbitChannel = await RabbitMQConsumer.initConnection();
    logger.info(' RabbitMQ Channel initiazlied successfully');
    rabbitMiddlewares(rabbitChannel);
    server.listen(env.SERVER_PORT, () => {
      logger.info(`Server started at port - ${env.SERVER_PORT}`);
    });
    async function shutDown() {
      await RabbitMQConsumer.closeConnection(rabbitChannel);
      logger.info(' RabbitMQ Consumer disconnected successfully');
      logger.error('Received kill signal, shutting down gracefully ');
      server.close(() => {
        logger.error('Closed out remaining connections');
        process.exit(0);
      });
      setTimeout(() => {
        logger.error(
          'Could not close connections in time, forcefully shutting down'
        );
        process.exit(1);
      }, 10000);
    }
    process.on('SIGTERM', shutDown);
    process.on('SIGINT', shutDown);
    process.on('uncaughtException', (e) => {
      logger.error(e, ' UncaughtException ');
      process.exit(1);
    });
    process.on('unhandledRejection', (err) => {
      logger.error(err || '', ' unhandledRejection ');
      process.exit(1);
    });
  } catch (e) {
    logger.error(e, ' error in initializing server ');
  }
})();
async function authenticateDB() {
  return db.getClient().authenticate({
    logging: function (logs) {
      logger.info(logs);
    },
  });
}
