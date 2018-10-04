import Dispather from '../Dispatcher';
import { getToken } from './AuthService';

const axios = require('axios');
const qs = require('qs');

const config = require('../config/config.json');
const apihost = config['apihost'];

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

  let res = axios.post(apihost + '/getResponseTimeForPeriod', data, getHeaders());
  return res;
}
