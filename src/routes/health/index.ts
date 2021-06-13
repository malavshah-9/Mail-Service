import { Router, Request, Response, NextFunction } from 'express';
import http from 'http-status-codes';

const router = Router();

router.get('/health', (req: Request, res: Response, next: NextFunction) => {
  req.log.debug(' This will be logged ');
  res.status(http.OK).send(' All Okay! ');
});

export default router;
