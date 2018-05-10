import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class ResponseStore extends EventEmitter {

    constructor() {
        super();
        this.requestResponses = {
            addSingleSiteResponse: null,
            addMultipleSitesResponse: null
        };
    }

    getResponse(response){
        return this.requestResponses[response];
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

    handleActions(action){
        const type = action.type;
        
        switch(action.type) {
            case 'ADD_SINGLE_SITE':
                this.serviceResultOfAddingSingleSite(action.response.data, action.siteName)
                break;
            case 'ADD_MULTIPLE_SITE':
                this.serviceResultOfAddingMultipleSites(action.errors.data, action.addedSitesCount)
                break;
        }
    }
}

const responseStore = new ResponseStore;
Dispather.register(responseStore.handleActions.bind(responseStore));

export default responseStore;