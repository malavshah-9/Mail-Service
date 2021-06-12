import { createServer } from 'http';
import env from './config/environment';
import app from './app';

const server = createServer(app);

(() => {
  server.listen(env.SERVER_PORT, () => {
    console.log(`Server started at port - ${env.SERVER_PORT}`);
  });
  function shutDown() {
    console.log('Received kill signal, shutting down gracefully ');
    server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
    });
    setTimeout(() => {
      console.log(
        'Could not close connections in time, forcefully shutting down'
      );
      process.exit(1);
    }, 10000);
  }
  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);
  process.on('uncaughtException', (e) => {
    console.log('UncaughtException ', e);
    process.exit(1);
  });
  process.on('unhandledRejection', (e) => {
    console.log('UncaughtException ', e);
  });
})();
