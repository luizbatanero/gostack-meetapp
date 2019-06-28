import { parseISO, isBefore } from 'date-fns';

import { storeSchema, updateSchema } from '../validations/Meetup';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    if (!(await storeSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (isBefore(parseISO(req.body.date), Date.now())) {
      return res.json({ error: "Can't create meetup on a past date" });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    if (!(await updateSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetup" });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't cancel past meetup" });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
