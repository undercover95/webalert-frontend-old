import React from 'react';

import * as Actions from '../../../actions/Actions';
import SiteDataStore from '../../../stores/SiteDataStore';

import StatusTableRowItem_url from './StatusTableRowItem_url';
import StatusTableRowItem_statusCode from './StatusTableRowItem_statusCode';
import StatusTableRowItem_status from './StatusTableRowItem_status';
import StatusTableRowItem_responseTime from './StatusTableRowItem_responseTime';
import StatusTableRowItem_lastChecked from './StatusTableRowItem_lastChecked';


class StatusTableRow extends React.Component {

    constructor() {
        super();
        this.state = {
            isRefreshing: false
        }
    }

    componentWillMount() {
        SiteDataStore.on('change', () => {
            this.setState({
                isRefreshing: false
            });
        });
    }

    updateSingleSiteStatus() {

        this.setState({
            isRefreshing: true
        });

        Actions.updateSingleSiteStatus(this.props.site_data['url'])
    }

    removeSite() {
        if (!confirm("Czy na pewno usunąć witrynę " + this.props.site_data['url'] + " z monitora?")) return;
        else Actions.removeSite(this.props.site_data['site_id']);
    }

    render() {
        
        const site_data = this.props.site_data;

        return (
            <tr>
                <td>
                    <input className="select-site" type="checkbox"/>
                </td>

                <StatusTableRowItem_url url={site_data['url']}/>
                <StatusTableRowItem_statusCode status_code={site_data['status_code']} short_desc={site_data['short_desc']}/>
                <StatusTableRowItem_status status_code={site_data['status_code']} last_working_time={site_data['last_working_time']} />
                <StatusTableRowItem_responseTime last_response_time={site_data['last_response_time']}/>
                <StatusTableRowItem_lastChecked isRefreshing={this.state.isRefreshing} last_checked={site_data['last_checked']}/>

                <td>
                    <div className="btn-group" role="group" aria-label="options">
                        <button type="button" onClick={this.updateSingleSiteStatus.bind(this)} title="Odśwież stan tej witryny" className="btn btn-sm btn-info refresh-page-status" disabled={this.state.isRefreshing ? true : false}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </button>

                        <button type="button" className="btn btn-sm btn-light view-stats-btn" title="Pokaż statystyki dla tej witryny">
                            <i className="fa fa-pie-chart" aria-hidden="true"></i>
                        </button>

                        <button type="button" onClick={this.removeSite.bind(this)} title="Usuń tę witrynę z monitora" className="btn btn-sm btn-danger remove-page">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}
  
export default StatusTableRow;