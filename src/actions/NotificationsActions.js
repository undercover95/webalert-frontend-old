import Dispather from '../Dispatcher';
import { getToken } from './AuthService';

const axios = require('axios');
const qs = require('qs');

const apihost = 'http://localhost:3000';

const getHeaders = () => {
  return {
    headers: { Authorization: 'Bearer ' + getToken() }
  }
}

export function getNotifications(period = 24) {
  let data = qs.stringify({ period: period });

  if (period == null || period == undefined || period == '') return;

  axios.post(apihost + '/getNotifications', data, getHeaders()).then((res) => {

    Dispather.dispatch({
      type: 'GET_NOTIFICATIONS',
      data: res
    })
  })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji getNotifications! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS getNotifications FAILED', err)
      });
}