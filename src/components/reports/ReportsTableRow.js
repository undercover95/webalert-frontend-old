import React from 'react';

import * as Actions from 'actions/Actions';
import ReportsDataStore from 'stores/ReportsDataStore';

import ReportsTableRowItem_name from './ReportsTableRowItem_name';
import ReportsTableRowItem_date from './ReportsTableRowItem_date';
import ReportView from './ReportView';

export default class ReportsTableRow extends React.Component {

    report_data = [];

    checkIfSiteWorking(http_code) {
        if((http_code >= 400 && http_code < 600) || http_code < 0 || http_code == 310) return false;
        else return true;
    }

    componentWillMount() {
        this.report_data = this.props.report_data;
    }

    getReportName() {
        let name = '';
        if(!this.checkIfSiteWorking(this.report_data['status_code'])) {
            name = 'Strona '+this.report_data['url']+' przestała działać!';
        }
        else name = 'Strona '+this.report_data['url']+' znów działa.';
        return name;
    }

    render() {

        return (
            <tr>
                <ReportsTableRowItem_name report_name={this.getReportName()} />
                <ReportsTableRowItem_date report_time={this.report_data['generated_time']} />
                <td>
                    <ReportView title={this.getReportName()} content={'test'} />
                </td>
            </tr>
        );
    }
}
  