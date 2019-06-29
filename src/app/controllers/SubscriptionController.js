import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class SubscriptionController {
  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

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

    return res.json(subscription);
  }
}

export default new SubscriptionController();
