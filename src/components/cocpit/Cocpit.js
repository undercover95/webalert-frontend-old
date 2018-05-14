import React from 'react';

import Title from '../Title';
import Overview from './overview/Overview';
import StatusTable from './statusTable/StatusTable';

export default class Cocpit extends React.Component {

    componentDidMount() {
        document.title = 'Kokpit | Monitor stron internetowych'
    }

    render() {
        return (
            <div>
                <Title title='Kokpit' icon='fa-home' />
                <Overview />
                <StatusTable />
            </div>
        )
    }
}