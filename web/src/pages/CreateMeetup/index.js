import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function CreateMeetup() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <h1>Create Meetup</h1>
      <DatePicker
        value={date}
        selected={date}
        onChange={setDate}
        minDate={new Date()}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy - HH:mm"
      />
    </>
  );
}
