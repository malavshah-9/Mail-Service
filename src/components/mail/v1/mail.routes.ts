import { Router } from 'express';
import MailController from './mail.controller';

const MailRouter = Router();

MailRouter.post('/mail', MailController.create);
MailRouter.get('/mail/:senderId', MailController.get);
MailRouter.get('/mail-failed', MailController.getByStatus);
MailRouter.post('/mail-failed', MailController.sendFailedEmail);

export default MailRouter;
