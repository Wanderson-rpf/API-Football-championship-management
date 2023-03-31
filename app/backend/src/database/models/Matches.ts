import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

export default class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },

  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },

  homeTeamGoals: {
    type: INTEGER,
  },

  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },

  awayTeamGoals: {
    type: INTEGER,
  },

  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Matches.belongsTo(Teams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

// Teams.hasMany(Matches);
