import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class ReportsDataStore extends EventEmitter {

    constructor() {
        super();
        this.data = [];
        
    }

    getData() {
        return this.data;
    }

    updateReportsData(res) {
        console.log('report DATA: ',res.data.result);
        this.data = res.data.result;
        this.emit('reportDataChange');
    }

    handleActions(action){
        const type = action.type;
        
        switch(type) {
            case 'GET_REPORTS_DATA':
                this.updateReportsData(action.data)
                break;
        }
    }
}

const reportsDataStore = new ReportsDataStore;
Dispather.register(reportsDataStore.handleActions.bind(reportsDataStore));

export default reportsDataStore;