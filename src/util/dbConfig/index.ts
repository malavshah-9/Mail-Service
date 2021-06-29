import { logger } from '../../util/logger';
import { Sequelize } from 'sequelize';
import env from '../../config/environment';

class DBClient {
  dbClient: Sequelize;
  constructor() {
    this.dbClient = new Sequelize({
      dialect: 'postgres',
      database: env.DATABASE_NAME,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      host: env.DATABASE_HOST,
      port: parseInt(env.DATABASE_PORT + ''),
    });
    // if (env.IS_DEV) {
    //   this.dbClient.sync().then(() => {
    //     logger.info('Db successfully synchronized!');
    //   });
    // }
  }
  getClient() {
    if (!this.dbClient) {
      this.dbClient = new Sequelize({
        dialect: 'postgres',
        database: env.DATABASE_NAME,
        username: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
        host: env.DATABASE_HOST,
        port: parseInt(env.DATABASE_PORT + ''),
      });
    }
    return this.dbClient;
  }
}

export default new DBClient();
