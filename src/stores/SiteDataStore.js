import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class SiteDataStore extends EventEmitter {

    constructor() {
        super();
        this.siteData = [];
        this.requestResponses = {
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

    resultOfAddingMultipleSites(response) {
        console.log('response',response);
        this.requestResponses['addMultipleSitesResponse'] = response.data;
        this.emit('addMultipleSitesResponse');
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
            case 'ADD_MULTIPLE_SITE':
                this.resultOfAddingMultipleSites(action.response)
        }
    }
}

const siteDataStore = new SiteDataStore;
Dispather.register(siteDataStore.handleActions.bind(siteDataStore));

export default siteDataStore;