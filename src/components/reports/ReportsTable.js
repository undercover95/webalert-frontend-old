import React from 'react';

import ReportsDataStore from 'stores/ReportsDataStore';
import * as Actions from 'actions/Actions';

import {
    NavLink as Link
  } from 'react-router-dom';

import ReportsTableRow from './ReportsTableRow';

export default class ReportsTable extends React.Component {
    
    period = 24;

    constructor() {
        super();
        this.state = {
            data: []
        };
        this.getReportsData = this.getReportsData.bind(this);
    }

    componentWillMount() {
        ReportsDataStore.on('reportDataChange', this.getReportsData);
    }

    componentWillUnmount() {
        ReportsDataStore.removeListener('reportDataChange', this.getReportsData);
    }

    componentDidMount() {
        Actions.getReports(720);
    }

    getReportsData() {
        this.setState({
            data: ReportsDataStore.getData()
        });
    }

    render() {
        let emptyData = false;

        if(this.state.data.length == 0) emptyData = true;

        return (
            <div>             
                <div id='status-table-wrapper' className='table-responsive'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Data wygenerowania</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{
                            !emptyData ? (
                                this.state.data.map(report_data => {
                                    return <ReportsTableRow key={report_data.report_id} report_data={report_data} />
                                })
                            ) : ''
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}