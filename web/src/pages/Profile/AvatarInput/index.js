import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { MdAddAPhoto } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ profileId }) {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    try {
      const response = await api.post('upload/avatar', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      const { data } = err.response;
      toast.error(
        `Error: ${
          data.error && data.error.message
            ? data.error.message
            : 'Internal server error'
        }`
      );
    }
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={preview || `https://api.adorable.io/avatars/150/${profileId}`}
          alt=""
        />

        <div className="overlay">
          <MdAddAPhoto size={36} color="#9a68ed" />
        </div>

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
