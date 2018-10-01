import Dispather from '../Dispatcher';
import { getToken } from './AuthService';

const axios = require('axios');
const qs = require('qs');

const config = require('./config.json');
const apihost = config['apihost'];

const getHeaders = () => {
  return {
    headers: { Authorization: 'Bearer ' + getToken() }
  }
}

export function getReports(period = 24) {
  let data = qs.stringify({ period: period });

  if (period == null || period == undefined || period == '') return;

  axios.post(apihost + '/getReports', data, getHeaders()).then((res) => {

    Dispather.dispatch({
      type: 'GET_REPORTS_DATA',
      data: res
    })
  })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji getReports! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS getReports FAILED', err)
      });
}

export function receiveReport(report_id) {
  let data = qs.stringify({ id: report_id });

  if (report_id == null || report_id == undefined || report_id == '') return;

  axios.post(apihost + '/receiveReport', data, getHeaders())
    .then((res) => {
      console.log(res.data.result);
      getReports();
    })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji receiveReport! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS receiveReport FAILED', err)
      });
}

export function getNewReportsCounter() {
  axios.post(apihost + '/controller.php?action=getNewReportsCounter', data)
    .then((res) => {
      console.log(res.data.result);
      Dispather.dispatch({
        type: 'GET_NEW_REPORTS_COUNTER',
        data: res
      })
    })
    .catch((err) => {
      console.log('AXIOS getNewReportsCounter FAILED', err)
    });
}

