import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class StatsStore extends EventEmitter {

    constructor() {
        super();
        this.data = [];

    }

    getData() {
        return this.data;
    }

    getResponseTimeData(res) {
        console.log('CHART DATA: ',res.data);
        this.data = res.data.result;

        // remove initial null value
        this.data.shift();

        this.emit('statsDataChange');
    }

    handleActions(action){
        const type = action.type;

        switch(type) {
            case 'GET_RESPONSE_TIME_DATA':
                this.getResponseTimeData(action.data)
                break;
        }
    }
}

const statsStore = new StatsStore;
Dispather.register(statsStore.handleActions.bind(statsStore));

export default statsStore;
