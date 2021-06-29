import { MailSchema } from '../schema';
import { MAIL_STATUS } from '../../../util/constants';

class MailModel {
  /**
   * @description Used to create details for sending email - Inserting into DB
   */
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
  /**
   *
   * @param updatedDetails Pass the attributes needed to update
   * @param id Pass the id of particular row for which you want to update details
   * @returns result of updated item or error
   */
  async update(updatedDetails = {}, id) {
    return MailSchema.update(updatedDetails, {
      where: {
        id,
      },
    });
  }
  /**
   *
   * @param id Pass the id for which you want to get details
   * @returns will return the data else single empty object
   */
  async getById(id: any) {
    return MailSchema.findByPk(id);
  }
  /**
   *
   * @param senderId Pass the senderId fow hich you want to retrive data
   * @returns Will return the data found from DB by senderId
   */
  async getBySenderId(senderId: string) {
    return MailSchema.findAndCountAll({
      where: {
        senderId,
      },
    });
  }
  /**
   *
   * @param attr attributes which you want to include in where
   * @returns Will return the data
   */
  async getByGivenAttribute(attr: any = {}) {
    return MailSchema.findAndCountAll({
      where: {
        ...attr,
      },
    });
  }
}

export default new MailModel();
