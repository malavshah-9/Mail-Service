import { Application, urlencoded } from 'express';
import cors from 'cors';
import compression from 'compression';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import logger from '../util/logger';
export default function (app: Application) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(compression({ level: 1 }));
  app.use(methodOverride());
  app.use(logger.logger);
}
