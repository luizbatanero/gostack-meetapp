import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="MeetApp" />
          </Link>
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
