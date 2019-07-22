import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import {
  MdEdit,
  MdDeleteForever,
  MdDateRange,
  MdLocationOn,
} from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Details, Subscriptions } from './styles';

export default function Meetup({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`organizing/${id}`);
        setMeetup({
          ...response.data,
          formattedDate: format(
            parseISO(response.data.date),
            "d 'de' MMMM 'de' yyyy', às' HH'h'mm",
            { locale: pt }
          ),
        });

        setTimeout(() => {
          setLoading(false);
        }, 200);
      } catch (err) {
        toast.error('Meetup not found');
        history.push('/');
      }
    }

    loadMeetup();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="TailSpin" color="#9a68ed" width={32} height={32} />
        </div>
      ) : (
        <Details>
          <header>
            <h1>{meetup.title}</h1>

            {!meetup.past && (
              <nav>
                <button type="button" className="edit">
                  <MdEdit size={16} color="#fff" />
                  Edit
                </button>

                <button type="button" className="cancel">
                  <MdDeleteForever size={20} color="#fff" />
                  Cancel
                </button>
              </nav>
            )}
          </header>

          <main>
            <div className="image-wrapper">
              <img src={meetup.banner.url} alt={meetup.title} />
            </div>
            <p>{meetup.description}</p>
          </main>

          <footer>
            <div className="info">
              <p>
                <MdDateRange size={18} color="#445ae3" />
                {meetup.formattedDate}
              </p>
              <p>
                <MdLocationOn size={18} color="#445ae3" />
                {meetup.location}
              </p>
            </div>
            <Subscriptions>subscriptions</Subscriptions>
          </footer>
        </Details>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
