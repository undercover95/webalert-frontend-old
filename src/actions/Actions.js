import Dispather from '../Dispatcher';

const axios = require('axios');
const qs = require('qs');

export function getLatestAllSitesStatus() {
    axios.get('http://localhost/monitor_stron/engine/controller.php?action=getLastAllPagesStatus').then((site_data) => {
        Dispather.dispatch({
            type: 'GET_ALL_SITES_STATUS',
            data: site_data.data
        })
    })
    .catch((err) => {
        console.log('AXIOS getLatestAllSitesStatus FAILED', err)
    });
}

export function updateSingleSiteStatus(site_url) {

    let data = qs.stringify({
        url: site_url
    });

    axios.post('http://localhost/monitor_stron/engine/controller.php?action=refreshSinglePageStatus',data).then((resp) => {
        
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
    console.log("Removing site id:",site_id)
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
    console.log("adding site:",url)

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
        pages.push(page.replace(/\s/g, ''));
    });

    let data = qs.stringify({
        sites: pages
    });
    console.log("adding sites:",pages)

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