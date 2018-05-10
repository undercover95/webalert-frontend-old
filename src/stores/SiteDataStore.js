import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class SiteDataStore extends EventEmitter {

    constructor() {
        super();
        this.siteData = [];
        this.requestResponses = {
            addSingleSiteResponse: null,
            addMultipleSitesResponse: null
        };
    }

    getAllSitesData() {
        return this.siteData;
    }

    getResponse(response){
        return this.requestResponses[response];
    }

    updateAllSitesData(data) {
        //console.log('updateAllSitesData', data);
        this.siteData = data;

        this.emit('change');
        this.emit('counterChange');
    }

    serviceResultOfAddingMultipleSites(errors, addedSitesCount) {
        console.log('response',errors, addedSitesCount);
        this.requestResponses.addMultipleSitesResponse = {
            errors: errors.errors,
            addedSitesCount: addedSitesCount
        }
        this.emit('addMultipleSitesResponse');
    }

    serviceResultOfAddingSingleSite(response, siteName) {
        console.log("response single:",response);
        this.requestResponses.addSingleSiteResponse = {
            result: response.result,
            siteName: siteName
        }
        this.emit('addSingleSiteResponse');
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
        const type = action.type;
        
        switch(action.type) {
            case 'GET_ALL_SITES_STATUS': 
                this.updateAllSitesData(action.data)
                break;
            case 'ADD_SINGLE_SITE':
                this.serviceResultOfAddingSingleSite(action.response.data, action.siteName)
                break;
            case 'ADD_MULTIPLE_SITE':
                this.serviceResultOfAddingMultipleSites(action.errors.data, action.addedSitesCount)
                break;
        }
    }
}

const siteDataStore = new SiteDataStore;
Dispather.register(siteDataStore.handleActions.bind(siteDataStore));

export default siteDataStore;