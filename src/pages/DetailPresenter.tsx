import React from 'react';
import { Redirect } from 'react-router';
import DetailContainer from '../containers/DetailContainer';
import useToken from '../hooks/useToken';

export default function DetailPresenter() {
  const token = useToken();

  if (token === null) {
    return <Redirect to="/" />;
  }
  return <DetailContainer />;
}
