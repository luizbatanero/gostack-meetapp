import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import history from '~/services/history';

import logo from '~/assets/logo.png';
import { Container, Content } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const {
    location: { pathname },
    goBack,
  } = history;

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="MeetApp" />
          </Link>

          {pathname !== '/dashboard' && (
            <button type="button" onClick={goBack}>
              <MdArrowBack size={15} />
              back
            </button>
          )}
        </nav>

        <aside>
          <Link to="/profile">
            <img
              src={
                (profile.avatar && profile.avatar.url) ||
                `https://api.adorable.io/avatars/50/${profile.id}`
              }
              alt={profile.name}
            />
            {profile.name}
          </Link>
        </aside>
      </Content>
    </Container>
  );
}
