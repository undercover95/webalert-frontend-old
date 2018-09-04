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

export function getLatestAllSitesStatus() {
  axios.get(apihost + '/getLastAllPagesStatus', getHeaders())
    .then((site_data) => {
      Dispather.dispatch({ type: 'GET_ALL_SITES_STATUS', data: site_data.data })
    })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji getLatestAllSitesStatus! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS getLatestAllSitesStatus FAILED', err)
      });
}

export function getLastStatusOfWebsite(site_id) {
  let data = qs.stringify({ id: site_id });

  axios.post(apihost + '/getLastPageStatus', data, getHeaders())
    .then((site_data) => {
      Dispather.dispatch({ type: 'GET_SINGLE_SITE_STATUS', data: site_data.data })
    })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji getLastStatusOfWebsite! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS getLastStatusOfWebsite FAILED', err)
      });
}

export function updateSingleSiteStatus(site_id) {
  let data = qs.stringify({ id: site_id });

  axios.post(apihost + '/refreshSinglePageStatus', data, getHeaders())
    .then(() => {
      getLastStatusOfWebsite(site_id);
    })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji updateSingleSiteStatus! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS updateSingleSiteStatus FAILED', err)
      });
}

export function updateAllSitesStatus() {
  axios.get(apihost + '/refreshAllPagesStatus', getHeaders())
    .then((res) => {
      getLatestAllSitesStatus();
    })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji updateAllSitesStatus! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS updateAllSitesStatus FAILED', err)
      });
}

export function removeSite(site_id) {
  let data = qs.stringify({ id: site_id });
  axios.post(apihost + '/removePage', data, getHeaders())
    .then(() => {
      getLatestAllSitesStatus();
    })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji removeSite! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS removeSite FAILED', err)
      });
}

export function addSingleSite(url) {
  let data = qs.stringify({ url: url });

  if (url == '' || url === undefined || url === null) return;

  axios.post(apihost + '/addSinglePage', data, getHeaders())
    .then(
      (res) => {
        Dispather.dispatch(
          { type: 'ADD_SINGLE_SITE', response: res, siteName: url })
      })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji addSingleSite! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS addSingleSite FAILED', err)
      });
}

export function addMultipleSites(inputStr) {
  if (inputStr == '') return;

  let pages_array = inputStr.split(',');
  let pages = [];

  pages_array.forEach(function (page) {
    if (page == '' || page == null || page == undefined) return;
    pages.push(page.replace(/\s/g, ''));
  });

  let data = qs.stringify({ sites: pages });

  axios.post(apihost + '/addMultiplePages', data, getHeaders())
    .then((errors) => {
      Dispather.dispatch({
        type: 'ADD_MULTIPLE_SITE',
        errors: errors,
        addedSitesCount: pages.length
      })
    })
    .catch(
      (err) => {
        if (err.response) {
          if (err.response.status == 403) alert('Nie można wykonać akcji addMultipleSites! Nie jesteś zalogowany!')
        }
        else console.log('AXIOS addMultipleSites FAILED', err)
      });
}

export function collectCheckedSite(site_id) {
  Dispather.dispatch({ type: 'COLLECT_CHECKED_SITE', data: site_id });
}

export function removeCheckedSite(site_id) {
  Dispather.dispatch({ type: 'REMOVE_CHECKED_SITE', data: site_id });
}

export function checkAllSites() {
  Dispather.dispatch({ type: 'CHECK_ALL_SITES' });
}

export function uncheckAllSites() {
  Dispather.dispatch({ type: 'UNCHECK_ALL_SITES' });
}