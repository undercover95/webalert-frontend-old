import React from 'react';

import Title from '../sections/Title';
import Overview from './overview/Overview';
import StatusTable from './statusTable/StatusTable';

import SiteDataStore from 'stores/SiteDataStore';
import * as Actions from 'actions/Actions';
export default class Cocpit extends React.Component {

    constructor() {
        super();
        this.state = {
            waitingForData: false,
            data: []
        };
        this.getData = this.getData.bind(this);
    }

    getData() {
        this.setState({
            waitingForData: false,
            data: SiteDataStore.getAllSitesData()
        });
    }

    componentWillMount() {
        SiteDataStore.on('change', this.getData);
    }

    componentWillUnmount() {
        //clearInterval(this.cyclicUpdateIntervalId);
        SiteDataStore.removeListener('change', this.getData);
    }

    componentDidMount() {
        this.setState({
            waitingForData: true
        });

        Actions.getLatestAllSitesStatus();
    }

    render() {
        const data = this.state.data;
        return (
            <div>
                <Title title='Kokpit' icon='fa-home' />
                <Overview data={data} />
                <StatusTable data={data} waitingForData={this.state.waitingForData} />
            </div>
        )
    }
}
