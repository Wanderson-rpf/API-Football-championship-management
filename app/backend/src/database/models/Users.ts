import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

export default class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },

  username: {
    allowNull: false,
    type: STRING,
  },

  role: {
    allowNull: false,
    type: STRING,
  },

  email: {
    allowNull: false,
    type: STRING,
  },

  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});
