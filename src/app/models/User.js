import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasOne(models.File, {
      foreignKey: 'id',
      sourceKey: 'avatar_id',
      as: 'avatar',
    });
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
