import { Op } from 'sequelize';
import { format } from 'date-fns';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';

import Mail from '../../lib/Mail';

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
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to your own meetup" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past meetups" });
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
        .json({ error: 'User is already subscribed to this meetup' });
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
        error: 'User is already subscribed for a meetup on the same date',
      });
    }

    const subscription = await Subscription.create({
      meetup_id: meetup.id,
      user_id: req.userId,
    });

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: `Nova inscrição (${meetup.title})`,
      template: 'new-subscription',
      context: {
        organizerName: meetup.user.name,
        meetupTitle: meetup.title,
        meetupDate: format(meetup.date, "dd/MM/yyyy 'às' H:mm'h'"),
        userName: user.name,
        userEmail: user.email,
      },
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
