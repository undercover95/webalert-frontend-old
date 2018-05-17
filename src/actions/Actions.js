import Dispather from '../Dispatcher';

const axios = require('axios');
const qs = require('qs');

export function getLatestAllSitesStatus() {
    axios.get('http://localhost/monitor_stron/engine/controller.php?action=getLastAllPagesStatus').then((site_data) => {
        console.log('getLatestAllSitesStatus AXIOS completed');
        Dispather.dispatch({
            type: 'GET_ALL_SITES_STATUS',
            data: site_data.data
        })
    })
    .catch((err) => {
        console.log('AXIOS getLatestAllSitesStatus FAILED', err)
    });
}

export function updateSingleSiteStatus(site_id) {

    let data = qs.stringify({
        id: site_id
    });

    axios.post('http://localhost/monitor_stron/engine/controller.php?action=refreshSinglePageStatus',data).then((resp) => {
        console.log('single page update response',resp);
        getLatestAllSitesStatus();
    })
    .catch((err) => {
        console.log('AXIOS updateSingleSiteStatus FAILED', err)
    });

    
}

export function updateAllSitesStatus() {

    axios.post('http://localhost/monitor_stron/engine/controller.php?action=refreshAllPagesStatus').then(() => {
        getLatestAllSitesStatus();
    })
    .catch((err) => {
        console.log('AXIOS updateAllSitesStatus FAILED', err)
    });

    
}

export function removeSite(site_id) {

    let data = qs.stringify({
        id: site_id
    });
    console.log('Removing site id:',site_id)
    axios.post('http://localhost/monitor_stron/engine/controller.php?action=removePage',data).then(() => {
        getLatestAllSitesStatus();
    })
    .catch((err) => {
        console.log('AXIOS removeSite FAILED', err)
    });
}

export function addSingleSite(url) {
    let data = qs.stringify({
        url: url
    });
    console.log('adding site:',url)

    if(url == '' || url === undefined || url === null) return;

    axios.post('http://localhost/monitor_stron/engine/controller.php?action=addSinglePage',data).then((res) => {
        Dispather.dispatch({
            type: 'ADD_SINGLE_SITE',
            response: res,
            siteName: url
        })
    })
    .catch((err) => {
        console.log('AXIOS addSingleSite FAILED', err)
    });
}

export function addMultipleSites(inputStr) {

    if (inputStr == '') return;

    let pages_array = inputStr.split(',');
    let pages = [];

    pages_array.forEach(function(page) {
        if(page == '' || page == null || page == undefined) return;
        pages.push(page.replace(/\s/g, ''));
    });

    let data = qs.stringify({
        sites: pages
    });
    console.log('adding sites:',pages)

    axios.post('http://localhost/monitor_stron/engine/controller.php?action=addMultiplePages',data).then((errors) => {
        Dispather.dispatch({
            type: 'ADD_MULTIPLE_SITE',
            errors: errors,
            addedSitesCount: pages.length
        })
    })
    .catch((err) => {
        console.log('AXIOS addMultipleSites FAILED', err)
    });
}

export function getResponseTimeData(url, period) {
    let data = qs.stringify({
        url: url,
        period: period
    });

    if(url == '' || url === undefined || url === null || period == null || period == undefined || period == '') return;

    axios.post('http://localhost/monitor_stron/engine/controller.php?action=getResponseTimeForPeriod',data).then((res) => {
        Dispather.dispatch({
            type: 'GET_RESPONSE_TIME_DATA',
            data: res
        })
    })
    .catch((err) => {
        console.log('AXIOS getResponseTimeData FAILED', err)
    });
}

export function collectCheckedSite(site_id) {
    Dispather.dispatch({
        type: 'COLLECT_CHECKED_SITE',
        data: site_id
    });
}

export function removeCheckedSite(site_id) {
    Dispather.dispatch({
        type: 'REMOVE_CHECKED_SITE',
        data: site_id
    });
}

export function checkAllSites() {
    Dispather.dispatch({
        type: 'CHECK_ALL_SITES'
    });
}

export function uncheckAllSites() {
    Dispather.dispatch({
        type: 'UNCHECK_ALL_SITES'
    });
}

export function getReports(period) {
    let data = qs.stringify({
        period: period
    });

    if(period == null || period == undefined || period == '') return;

    axios.post('http://localhost/monitor_stron/engine/controller.php?action=getReports',data).then((res) => {
        console.log('getReports',res.data)
        Dispather.dispatch({
            type: 'GET_REPORTS_DATA',
            data: res
        })
    })
    .catch((err) => {
        console.log('AXIOS getReports FAILED', err)
    });
}