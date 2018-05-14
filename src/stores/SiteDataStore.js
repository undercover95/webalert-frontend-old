import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class SiteDataStore extends EventEmitter {

    constructor() {
        super();
        this.siteData = [];
        this.checkedSites = [];
    }

    getAllSitesData() {
        return this.siteData;
    }

    getCheckedSites() {
        return this.checkedSites;
    }

    saveCheckedSite(site_id) {
        
        if(!this.checkedSites.includes(site_id)) {
            this.checkedSites.push(site_id);
            //console.log(this.checkedSites);
            this.emit('checkedSiteChange');
        }
    }

    removeCheckedSite(site_id) {
        
        if(this.checkedSites.includes(site_id)) {
            this.checkedSites.splice(this.checkedSites.indexOf(site_id),1);
            //console.log(this.checkedSites);
            this.emit('checkedSiteChange');
        }
    }

    updateAllSitesData(data) {
        this.siteData = data.result;

        this.emit('change');
        this.emit('counterChange');
    }

    checkIfSiteWorking(http_code) {
        if(http_code == null) return;
        else if((http_code >= 400 && http_code < 600) || http_code < 0 || http_code == 310) return false;
        else return true;
    }

    getCounters() {
        return {
            all: this.siteData.length,
            notWorking:  this.siteData.filter(siteDataElem => !this.checkIfSiteWorking(siteDataElem.status_code)).length,
            working: this.siteData.filter(siteDataElem => this.checkIfSiteWorking(siteDataElem.status_code)).length
        }
    }

    handleActions(action){        
        switch(action.type) {
            case 'GET_ALL_SITES_STATUS': 
                this.updateAllSitesData(action.data)
                break;
            case 'COLLECT_CHECKED_SITE':
                this.saveCheckedSite(action.data)
                break;
            case 'REMOVE_CHECKED_SITE':
                this.removeCheckedSite(action.data)
                break;
        }
    }
}

const siteDataStore = new SiteDataStore;
Dispather.register(siteDataStore.handleActions.bind(siteDataStore));

export default siteDataStore;