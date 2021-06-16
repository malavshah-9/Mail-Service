import dotenv from 'dotenv';
dotenv.config({
  encoding: 'utf-8',
});
export default {
  SERVER_PORT: process.env.PORT,
  IS_DEV: process.env.NODE_ENV === 'development',
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  TWILLIO_API_KEY: process.env.SENDGRID_API_KEY,
  TWILLIO_VERIFIED_EMAIL: process.env.SENDER_FROM
};
