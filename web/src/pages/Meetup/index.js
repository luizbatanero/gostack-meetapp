import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import {
  MdEdit,
  MdDeleteForever,
  MdDateRange,
  MdLocationOn,
} from 'react-icons/md';
import nl2br from 'react-nl2br';

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
          ...response.data.meetup,
          subscriptions: response.data.subscriptions,
          formattedDate: format(
            parseISO(response.data.meetup.date),
            "dd/MM/Y - HH'h'mm"
          ),
        });

        setLoading(false);
      } catch (err) {
        toast.error('Meetup not found');
        history.push('/');
      }
    }

    loadMeetup();
  }, [id]);

  function handleEdit() {
    history.push(`/meetups/${id}/edit`);
  }

  async function handleCancel() {
    try {
      await api.delete(`meetups/${id}`);
      toast.success('Meetup canceled succesfully!');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Error canceling meetup, try again');
    }
  }

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
                <button type="button" className="edit" onClick={handleEdit}>
                  <MdEdit size={16} color="#fff" />
                  Edit
                </button>

                <button type="button" className="cancel" onClick={handleCancel}>
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

            <div className="wrapper">
              <p>{nl2br(meetup.description)}</p>
              <footer>
                <div className="info">
                  <p>
                    <MdDateRange size={18} color="#9a68ed" />
                    {meetup.formattedDate}
                  </p>
                  <p>
                    <MdLocationOn size={18} color="#9a68ed" />
                    {meetup.location}
                  </p>
                </div>
                {meetup.subscriptions.length >= 1 && (
                  <Subscriptions>
                    <div>
                      {meetup.subscriptions.slice(0, 5).map((sub, index) => (
                        <img
                          style={{
                            zIndex: 10 - index,
                          }}
                          key={String(index)}
                          src={
                            sub.user.avatar
                              ? sub.user.avatar.url
                              : `https://api.adorable.io/avatars/50/${sub.user.id}`
                          }
                          alt={sub.user.name}
                        />
                      ))}
                      {meetup.subscriptions.length > 5 && (
                        <div className="dots">
                          <div />
                          <div />
                          <div />
                        </div>
                      )}
                    </div>
                    <span>
                      <strong>{meetup.subscriptions.length}</strong>{' '}
                      subscription
                      {meetup.subscriptions.length > 1 && 's'}
                    </span>
                  </Subscriptions>
                )}
              </footer>
            </div>
          </main>
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
