import React from 'react';

import Title from 'components/Title';
import ReportsTable from './ReportsTable';

export default class Reports extends React.Component {

    componentDidMount() {
        document.title = 'Raporty | Monitor stron internetowych'
    }

    render() {
        return (
            <div>
                <Title title='Raporty' icon='fa-bullhorn' />
                <ReportsTable />
            </div>
        )
    }
}