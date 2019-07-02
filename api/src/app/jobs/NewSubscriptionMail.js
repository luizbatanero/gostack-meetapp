import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class NewSubscriptionMail {
  get key() {
    return 'NewSubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: `Nova inscrição (${meetup.title})`,
      template: 'new-subscription',
      context: {
        organizerName: meetup.user.name,
        meetupTitle: meetup.title,
        meetupDate: format(parseISO(meetup.date), "dd/MM/yyyy 'às' H:mm'h'"),
        userName: user.name,
        userEmail: user.email,
      },
    });
  }
}

export default new NewSubscriptionMail();
