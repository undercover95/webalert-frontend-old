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
        console.log('response single:',response);
        this.requestResponses.addSingleSiteResponse = {
            result: response.result,
            siteName: siteName
        }
        this.emit('addSingleSiteResponse');
    }

    serviceResultOfRegister(response) {
        console.log('response serviceResultOfRegister:',response.data);
        this.requestResponses.registerUserResponse = response.data;
        this.emit('registerUserResponse');
    }

    serviceResultOfLogin(response) {
        console.log('response serviceResultOfLogin:',response.data);

        if(response.data.token != undefined) {
          // logged
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('logged', true);
          this.emit('userLoginSuccess');
        }

        else {
          this.requestResponses.loginUserResponse = response.data;
          this.emit('loginUserResponse');
        }
    }

    handleActions(action){
        const type = action.type;

        switch(type) {
            case 'ADD_SINGLE_SITE':
                this.serviceResultOfAddingSingleSite(action.response.data, action.siteName)
                break;
            case 'ADD_MULTIPLE_SITE':
                this.serviceResultOfAddingMultipleSites(action.errors.data, action.addedSitesCount)
                break;
            case 'REGISTER_REQUEST_COMPLETED':
                this.serviceResultOfRegister(action.data)
                break;
          case 'LOGIN_REQUEST_COMPLETED':
            this.serviceResultOfLogin(action.data)
            break;
        }
    }
}

const responseStore = new ResponseStore;
Dispather.register(responseStore.handleActions.bind(responseStore));

export default responseStore;
