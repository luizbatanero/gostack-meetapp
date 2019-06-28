import { storeSchema } from '../validations/Meetup';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    if (!(await storeSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    res.json(meetup);
  }
}

export default new MeetupController();
