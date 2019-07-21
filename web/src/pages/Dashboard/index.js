import React from 'react';
import { Link } from 'react-router-dom';

import { MdAddCircleOutline, MdDateRange, MdLocationOn } from 'react-icons/md';

import { Container, MeetupsList } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <h1>My Meetups</h1>
        <Link to="/">
          <MdAddCircleOutline color="#fff" size={22} />
          New Meetup
        </Link>
      </header>

      <MeetupsList>
        <div className="empty">You don't have any meetups yet.</div>
        <Link to="/">
          <p>Meetup de React Native</p>
          <aside>
            <p>
              <MdDateRange size={14} />
              24 de Junho de 2019 - 19h
            </p>
            <p>
              <MdLocationOn size={14} />
              São Paulo/SP
            </p>
          </aside>
        </Link>
      </MeetupsList>
    </Container>
  );
}
