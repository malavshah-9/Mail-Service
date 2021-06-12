import dotenv from 'dotenv';
dotenv.config({
  encoding: 'utf-8',
});
export default {
  SERVER_PORT: process.env.PORT,
  IS_DEV: process.env.NODE_ENV === 'production',
};
