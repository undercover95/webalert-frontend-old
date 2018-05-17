import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class ReportsDataStore extends EventEmitter {

    constructor() {
        super();
        this.data = [];
        this.newReportsCounter = 0;
    }

    getData() {
        return this.data;
    }

    getNewReportsCounter() {
        return this.newReportsCounter;
    }

    updateReportsData(res) {
        console.log('report DATA: ',res.data.result);
        this.data = res.data.result;
        this.emit('reportDataChange');
    }

    updateNewReportsCounter(res) {
        this.newReportsCounter = res.data.result;
        this.emit('updateNewReportsCounter');
    }

    handleActions(action){
        const type = action.type;
        
        switch(type) {
            case 'GET_REPORTS_DATA':
                this.updateReportsData(action.data)
                break;
            case 'GET_NEW_REPORTS_COUNTER':
                this.updateNewReportsCounter(action.data)
                break;
        }
    }
}

const reportsDataStore = new ReportsDataStore;
Dispather.register(reportsDataStore.handleActions.bind(reportsDataStore));

export default reportsDataStore;