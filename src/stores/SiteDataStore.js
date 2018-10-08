import { EventEmitter } from 'events';
import * as Actions from 'actions/Actions';
import Dispather from '../Dispatcher';

class SiteDataStore extends EventEmitter {

    constructor() {
        super();
        this.siteData = {};
        this.checkedSites = [];
    }

    getAllSitesData() {

        /*let compare = (a, b) => {
            const codeA = a.status_code
            const codeB = b.status_code

            let comparison = 0;
            if (codeA > codeB) {
                comparison = 1;
            } else if (codeA < codeB) {
                comparison = -1;
            }
            return comparison;
        }*/

        return Object.values(this.siteData);
    }

    getSiteUrlById(site_id) {
        return this.siteData[site_id].url;
    }

    getCheckedSites() {
        return this.checkedSites;
    }

    saveCheckedSite(site_id) {

        if (!this.checkedSites.includes(site_id)) {
            this.checkedSites.push(site_id);

            this.emit('checkedSiteChange');
        }
    }

    removeCheckedSite(site_id) {

        if (this.checkedSites.includes(site_id)) {
            this.checkedSites.splice(this.checkedSites.indexOf(site_id), 1);

            this.emit('checkedSiteChange');
        }
    }

    updateAllSitesData(data) {
        const tempSiteData = data.result;

        this.siteData = {}
        tempSiteData.map(dataRow => {
            this.siteData[dataRow.site_id] = dataRow
        });

        this.emit('change');
    }

    updateSingleSiteData(data) {
        const tempSingleSiteData = data.result[0];
        this.siteData[tempSingleSiteData.site_id] = tempSingleSiteData

        this.emit('singleSiteStatusUpdated_id=' + tempSingleSiteData.site_id);
        this.emit('change');
    }

    checkAllSites() {
        console.log('checkAllSites');
        this.emit('checkAllSites');
    }

    uncheckAllSites() {
        console.log('uncheckAllSites');
        this.emit('uncheckAllSites');
    }

    handleActions(action) {
        switch (action.type) {
            case 'GET_ALL_SITES_STATUS':
                this.updateAllSitesData(action.data)
                break;

            case 'GET_SINGLE_SITE_STATUS':
                this.updateSingleSiteData(action.data)
                break;

            case 'COLLECT_CHECKED_SITE':
                this.saveCheckedSite(action.data)
                break;

            case 'REMOVE_CHECKED_SITE':
                this.removeCheckedSite(action.data)
                break;

            case 'CHECK_ALL_SITES':
                this.checkAllSites();
                break;

            case 'UNCHECK_ALL_SITES':
                this.uncheckAllSites();
                break;
        }
    }
}

const siteDataStore = new SiteDataStore;
Dispather.register(siteDataStore.handleActions.bind(siteDataStore));

export default siteDataStore;