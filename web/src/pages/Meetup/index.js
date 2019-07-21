import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

export default function Meetup({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`organizing/${id}`);
        setMeetup(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 200);
      } catch (err) {
        history.push('/');
      }
    }

    loadMeetup();
  }, [id]);

  return <div>{loading ? 'Loading...' : meetup.title}</div>;
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
