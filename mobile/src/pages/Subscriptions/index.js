import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';

import Header from '~/components/Header';

import { Container } from './styles';

function Subscriptions() {
  return (
    <>
      <Header />
      <Container>
        <Text>Subscriptions</Text>
      </Container>
    </>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default Subscriptions;
