import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';

import Queue from '../../lib/Queue';
import NewSubscriptionMail from '../jobs/NewSubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
            { model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
          ],
        },
      ],
      order: [['meetup', 'date', 'ASC']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }],
    });
    const user = await User.findByPk(req.userId);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found.' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "You can't subscribe to your own meetup." });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: "You can't subscribe to past meetups." });
    }

    const userAlreadySubscribed = await Subscription.findOne({
      where: {
        meetup_id: meetup.id,
        user_id: req.userId,
      },
    });

    if (userAlreadySubscribed) {
      return res
        .status(400)
        .json({ error: 'You are already subscribed to this meetup.' });
    }

    const sameDateSubscriptionExists = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { date: meetup.date },
        },
      ],
    });

    if (sameDateSubscriptionExists) {
      return res.status(400).json({
        error: 'You are already subscribed for a meetup on the same date.',
      });
    }

    const subscription = await Subscription.create({
      meetup_id: meetup.id,
      user_id: req.userId,
    });

    await Queue.add(NewSubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(400).json({
        message: 'You are not subscribed to this meetup.',
      });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
