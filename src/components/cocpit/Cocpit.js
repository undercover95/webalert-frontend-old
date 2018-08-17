import React from 'react';

import Title from '../sections/Title';
import Overview from './overview/Overview';
import StatusTable from './statusTable/StatusTable';

export default class Cocpit extends React.Component {

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
