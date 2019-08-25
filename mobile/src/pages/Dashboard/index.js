import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';

import Header from '~/components/Header';

import { Container } from './styles';

function Dashboard() {
  return (
    <>
      <Header />
      <Container>
        <Text>Dashboard</Text>
      </Container>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default Dashboard;
