import { Router } from 'express';
import MailController from './mail.controller';

const MailRouter = Router();

MailRouter.post('/mail', MailController.create);
MailRouter.get('/mail/:senderId',MailController.get);

export default MailRouter;
