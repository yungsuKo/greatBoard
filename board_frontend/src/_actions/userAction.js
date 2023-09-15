import { REGISTER_USER } from './types';
import axios from 'axios';

const USER_URL = '/auth';

export function authUser(dataToSubmit) {
  const data = axios
    .post(process.env.REACT_APP_BASE_URL + '/auth', dataToSubmit)
    .then((response) => {
      const { access_token } = response.data;
      return access_token;
    });

  return {
    type: REGISTER_USER,
    payload: data,
  };
}
