import { Application } from 'express';
import httpStatus from 'http-status-codes';
import listEndpoints from 'express-list-endpoints';
import env from '../config/environment';
import healthRouter from './health';
import { PREFIXES } from '../util/constants';
import Response from '../util/ResoponseFormatter';

export default function (app: Application) {
  app.use(PREFIXES.PREFIX_ROUTE_V1_API, healthRouter);
  app.use((_, res) => {
    return Response.createResponse(res, httpStatus.NOT_FOUND);
  });
  app.use((err: Error, req, res, next) => {
    if (err) {
      return Response.createResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        undefined,
        env.IS_DEV ? err.stack : {}
      );
    }
    return Response.createResponse(res, httpStatus.METHOD_FAILURE);
  });
  let allRoutes = listEndpoints(app);
  console.table(allRoutes);
}
