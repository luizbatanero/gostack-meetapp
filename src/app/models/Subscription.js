import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meetup, {
      foreignKey: 'meetup_id',
      as: 'meetup',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default Subscription;
