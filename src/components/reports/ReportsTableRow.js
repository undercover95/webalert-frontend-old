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
            name = <span className='not-working-text'><i className='fa fa-times-circle' aria-hidden='true'></i> Strona {this.report_data['url']} przestała działać!</span>;
        }
        else name = <span className='working-text'><i className='fa fa-check-circle' aria-hidden='true'></i> Strona {this.report_data['url']} znów działa.</span>;
        return name;
    }

    getContent() {
        let content = '';
        if(this.checkIfSiteWorking(this.report_data['status_code'])) {
            content = <div className='text-center'>
                <h4>Aktualny kod odpowiedzi serwera: <strong>{this.report_data['status_code']}</strong></h4>
                Awaria trwała od <strong>{this.report_data['breakdown_from']}</strong> do <strong>{this.report_data['breakdown_to']}</strong>.
            </div>
        } else {
            let code = this.report_data['status_code']
            content = <div className='text-center'>
            <h4>Aktualny kod odpowiedzi serwera: <strong>{(code == -1 || code == -2) ? '-' : code}</strong></h4>
            Awaria trwa od <strong>{this.report_data['breakdown_from']}</strong>.
        </div>
        }
        return content
    }

    render() {
        
        return (
            <tr>
                <ReportsTableRowItem_name report_name={this.getReportName()} />
                <ReportsTableRowItem_date report_time={this.report_data['generated_time']} />
                <td>
                    <ReportView report_id={this.report_data['id']} title={this.getReportName()} content={this.getContent()} />
                </td>
            </tr>
        );
    }
}
  