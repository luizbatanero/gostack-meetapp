import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { MdAddCircleOutline, MdDateRange, MdLocationOn } from 'react-icons/md';

import api from '~/services/api';

import { Container, MeetupsList, Meetup } from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(parseISO(meetup.date), "dd/MM/Y - HH'h'mm"),
        };
      });

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      {!loading && (
        <header>
          <h1>My Meetups</h1>
          <Link to="meetups/create">
            <MdAddCircleOutline color="#fff" size={22} />
            New Meetup
          </Link>
        </header>
      )}

      <MeetupsList>
        {loading && (
          <div className="loading">
            <Loader type="TailSpin" color="#9a68ed" width={32} height={32} />
          </div>
        )}

        {!loading && !meetups.length && (
          <div className="empty">You don&apos;t have any meetups yet.</div>
        )}

        {!loading &&
          meetups.map(meetup => (
            <Meetup
              to={`/meetups/${meetup.id}`}
              key={meetup.id}
              past={meetup.past ? 1 : 0}
            >
              <p>{meetup.title}</p>
              <aside>
                <p>
                  <MdDateRange size={14} />
                  {meetup.formattedDate}
                </p>
                <p>
                  <MdLocationOn size={14} />
                  {meetup.location}
                </p>
              </aside>
            </Meetup>
          ))}
      </MeetupsList>
    </Container>
  );
}
