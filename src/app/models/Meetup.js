import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        banner_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.File, {
      foreignKey: 'id',
      sourceKey: 'banner_id',
      as: 'banner',
    });

    this.hasOne(models.User, {
      foreignKey: 'id',
      sourceKey: 'user_id',
      as: 'user',
    });
  }
}

export default Meetup;
