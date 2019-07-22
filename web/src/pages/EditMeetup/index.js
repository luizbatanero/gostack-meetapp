import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import Loader from 'react-loader-spinner';

import api from '~/services/api';
import history from '~/services/history';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

export default function EditMeetup({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`organizing/${id}`);
        setMeetup({
          ...response.data.meetup,
          date: parseISO(response.data.meetup.date),
        });
        setLoading(false);
      } catch (err) {
        toast.error('Meetup not found');
        history.push('/');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      await api.put(`meetups/${id}`, data);
      toast.success('Meetup edited successfully!');
      history.push(`/meetups/${id}`);
    } catch (err) {
      const errData = err.response.data;
      toast.error(
        errData && errData.error
          ? `Error editing meetup: ${errData.error}`
          : 'Error editing meetup, try again'
      );
      setLoading(false);
    }
  }

  const schema = Yup.object().shape({
    banner_id: Yup.number()
      .transform(value => (!value ? undefined : value))
      .required('Banner is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    date: Yup.date().required('Date is required'),
    location: Yup.string().required('Location is required'),
  });

  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="TailSpin" color="#9a68ed" width={32} height={32} />
        </div>
      ) : (
        <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
          <BannerInput name="banner_id" />
          <Input name="title" placeholder="Title" />
          <Input name="description" placeholder="Description" multiline />
          <DatePicker name="date" placeholder="Date" />
          <Input name="location" placeholder="Location" />

          <button type="submit" disabled={loading}>
            <MdSave size={18} color="#fff" />
            Save
          </button>
        </Form>
      )}
    </Container>
  );
}
