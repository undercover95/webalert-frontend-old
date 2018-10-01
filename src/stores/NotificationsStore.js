import { EventEmitter } from 'events';

import Dispather from '../Dispatcher';

class NotificationsStore extends EventEmitter {

    constructor() {
        super();
        this.data = [];
    }

    getData() {
        return this.data;
    }

    updateNotificationsData(res) {
        console.log('notifs DATA: ', res.data.result);
        this.data = res.data.result;
        this.emit('notificationsDataChanged');
    }

    handleActions(action) {
        const type = action.type;

        switch (type) {
            case 'GET_NOTIFICATIONS':
                this.updateNotificationsData(action.data)
                break;
        }
    }
}

const notificationsStore = new NotificationsStore;
Dispather.register(notificationsStore.handleActions.bind(notificationsStore));

export default notificationsStore;