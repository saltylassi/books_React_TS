import React from 'react';
import { Redirect } from 'react-router';
import EditContainer from '../containers/EditContainer';
import useToken from '../hooks/useToken';

export default function EditPresenter() {
  const token = useToken();

  if (token === null) {
    return <Redirect to="/" />;
  }

  return <EditContainer />;
}
