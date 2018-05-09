import React from 'react';

import Title from '../Title';
import Overview from './Overview';
import StatusTable from './StatusTable';

export default class Cocpit extends React.Component {

    render() {
        return (
            <div>
                <Title title='Kokpit' />
                <Overview />
                <h3>Aktualny stan witryn</h3>
                <StatusTable />
            </div>
        )
    }
}