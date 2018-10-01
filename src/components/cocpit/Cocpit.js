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
        SiteDataStore.removeListener('change', this.getData);
    }

    componentDidMount() {
        this.setState({
            waitingForData: true
        });
    }

    render() {
        return (
            <div>
                <Title title='Kokpit' icon='fa-home' />
                <Overview data={this.state.data} />
                <StatusTable data={this.state.data} waitingForData={this.state.waitingForData} />
            </div>
        )
    }
}