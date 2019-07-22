import React from 'react';
import { Switch, Route as BaseRoute, Redirect } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import CreateMeetup from '~/pages/CreateMeetup';
import Meetup from '~/pages/Meetup';
import EditMeetup from '~/pages/EditMeetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/meetups/create" component={CreateMeetup} isPrivate />
      <Route path="/meetups/:id" exact component={Meetup} isPrivate />
      <Route path="/meetups/:id/edit" component={EditMeetup} isPrivate />

      <BaseRoute render={() => <Redirect to="/" />} />
    </Switch>
  );
}
