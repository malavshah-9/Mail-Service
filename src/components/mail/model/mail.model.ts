import { MailSchema } from '../schema';
import { MAIL_STATUS } from '../../../util/constants';

class MailModel {
  async create(
    subject: String,
    content: String,
    sendTo: String[],
    cc: string[],
    mailBy: string,
    senderId: string,
    status: string = MAIL_STATUS.ADD
  ) {
    return MailSchema.create({
      subject,
      content,
      sendTo,
      cc,
      mailBy,
      senderId,
      status,
    });
  }
  async update(status, id) {
    return MailSchema.update(
      {
        status,
      },
      {
        where: {
          id,
        },
      }
    );
  }
  async getById(id: any) {
    return MailSchema.findByPk(id);
  }
  async getBySenderId(senderId: string) {
    return MailSchema.findAndCountAll({
      where: {
        senderId,
      },
    });
  }
}

export default new MailModel();
