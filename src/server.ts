import { createServer } from 'http';
import db from './util/dbConfig';
import env from './config/environment';
import app from './app';
import { logger } from './util/logger';

const server = createServer(app);

(async () => {
  try {
    await authenticateDB();
    server.listen(env.SERVER_PORT, () => {
      logger.info(`Server started at port - ${env.SERVER_PORT}`);
    });
    function shutDown() {
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
    });
  } catch (e) {
    logger.error(e, ' error in authenticate db ');
  }
})();
async function authenticateDB() {
  return db.getClient().authenticate({
    logging: function (logs) {
      logger.info(logs);
    },
  });
}
