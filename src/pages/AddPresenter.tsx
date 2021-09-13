import React from 'react';
import { Redirect } from 'react-router';
import AddContainer from '../containers/AddContainer';
import useToken from '../hooks/useToken';

export default function AddPresenter() {
  const token = useToken();

  if (token === null) {
    return <Redirect to="/signin" />;
  }

  return <AddContainer />;
}
