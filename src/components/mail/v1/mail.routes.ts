import { Router } from 'express';
import MailController from './mail.controller';

const MailRouter = Router();

MailRouter.post('/mail', MailController.create);

export default MailRouter;
