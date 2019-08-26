import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Header from '~/components/Header';
import Loading from '~/components/Loading';
import Meetup from '~/components/Meetup';

import { Container, List, Empty, EmptyText } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubscriptions() {
    setLoading(true);

    const response = await api.get('subscriptions');

    setSubscriptions(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      Alert.alert('Success', 'You have cancelled your subscription!');
      loadSubscriptions();
    } catch (error) {
      const message = error.response.data.error;
      Alert.alert('Error', message);
    }
  }

  return (
    <>
      <Header />
      <Container>
        {loading && <Loading />}

        {!loading &&
          (subscriptions.length ? (
            <List
              data={subscriptions}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  data={item.meetup}
                  handleCancel={() => handleCancel(item.id)}
                />
              )}
            />
          ) : (
            <Empty>
              <Icon name="event-busy" size={45} color="rgba(0, 0, 0, .15)" />
              <EmptyText>You haven't subscribed to any meetups yet.</EmptyText>
            </Empty>
          ))}
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

export default withNavigationFocus(Subscriptions);
