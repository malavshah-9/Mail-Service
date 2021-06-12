import { Application } from 'express';
import listEndpoints from 'express-list-endpoints';
import healthRouter from './health';
import { PREFIXES } from '../util/constants';

export default function (app: Application) {
  app.use(PREFIXES.PREFIX_ROUTE_V1_API, healthRouter);
  let allRoutes = listEndpoints(app);
  console.table(allRoutes);
}
