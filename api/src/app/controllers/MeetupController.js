import { parseISO, isBefore, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import { storeSchema, updateSchema } from '../validations/Meetup';

class MeetupController {
  async index(req, res) {
    const page = req.query.page || 1;
    const amountPerPage = 10;

    const where = {};

    if (req.query.date) {
      const date = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(date), endOfDay(date)],
      };
    }

    const meetups = await Meetup.findAndCountAll({
      where,
      limit: amountPerPage,
      offset: (page - 1) * amountPerPage,
      order: [['date']],
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
      ],
    });

    const total_pages = Math.ceil(meetups.count / amountPerPage);

    return res.json({
      total_pages,
      ...meetups,
    });
  }

  async store(req, res) {
    if (!(await storeSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (isBefore(parseISO(req.body.date), Date.now())) {
      return res
        .status(400)
        .json({ error: "Can't create meetup on a past date" });
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
