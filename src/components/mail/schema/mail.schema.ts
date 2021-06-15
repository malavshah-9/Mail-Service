import { DataTypes, Model } from 'sequelize';
import db from '../../../util/dbConfig';

class Mail extends Model {}

Mail.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    subject: {
      type: DataTypes.TEXT({
        length: 'medium',
      }),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT({
        length: 'medium',
      }),
      allowNull: false,
    },
    sendTo: {
      type: DataTypes.ARRAY(DataTypes.STRING(60)),
      allowNull: false,
    },
    cc: {
      type: DataTypes.ARRAY(DataTypes.STRING(60)),
      allowNull: false,
    },
    mailBy: {
      type: DataTypes.STRING(50),
    },
    status: {
      type: DataTypes.ENUM('FAILED', 'SUCCESS', 'ADDED'),
    },
    senderId: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: db.getClient(),
    tableName: 'Mail',
    modelName: 'Mail',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
  }
);

export default Mail;
