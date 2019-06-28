import { parseISO, isBefore } from 'date-fns';

import { storeSchema } from '../validations/Meetup';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    if (!(await storeSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (isBefore(parseISO(req.body.date), Date.now())) {
      return res.json({ error: "You can't create a Meetup on a past date" });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
