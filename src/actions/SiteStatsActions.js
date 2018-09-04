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

export function getResponseTimeData(site_id, period) {
  let data = qs.stringify({ id: site_id, period: period });

  if (site_id == '' || site_id === undefined || site_id === null ||
    period == null || period == undefined || period == '')
    return;

  axios.post(apihost + '/getResponseTimeForPeriod', data, getHeaders())
    .then(
      (res) => {
        return res.data;
      })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji getResponseTimeData! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS getResponseTimeData FAILED', err)
      });
}
