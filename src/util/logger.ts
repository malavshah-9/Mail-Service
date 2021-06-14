import pinoHttp, { HttpLogger } from 'pino-http';
import env from '../config/environment';
class Logger {
  logger: HttpLogger;
  constructor() {
    this.logger = pinoHttp({
      autoLogging: true,
      useLevel: 'info',
      prettyPrint: env.IS_DEV
        ? {
            colorize: true,
            translateTime: true,
            levelFirst: true,
          }
        : false,
    });
  }
}
const logObj = new Logger();
export default logObj;
export const logger = logObj.logger.logger;
