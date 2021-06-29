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
    status: string = MAIL_STATUS.ADD,
    sendCount: Number = 0
  ) {
    return MailSchema.create({
      subject,
      content,
      sendTo,
      cc,
      mailBy,
      senderId,
      status,
      sendCount,
    });
  }
  async update(updatedDetails = {}, id) {
    return MailSchema.update(updatedDetails, {
      where: {
        id,
      },
    });
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
  async getByGivenAttribute(attr: any = {}) {
    return MailSchema.findAndCountAll({
      where: {
        ...attr,
      },
    });
  }
}

export default new MailModel();
