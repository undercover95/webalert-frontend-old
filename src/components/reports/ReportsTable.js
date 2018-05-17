import React from 'react';



import {
    NavLink as Link
  } from 'react-router-dom';

import ReportsTableRow from './ReportsTableRow';

export default class ReportsTable extends React.Component {

    render() {
        let emptyData = false;

        if(this.props.data.length == 0) emptyData = true;

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
                                this.props.data.map(report_data => {
                                    return <ReportsTableRow key={report_data.id} report_data={report_data} />
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