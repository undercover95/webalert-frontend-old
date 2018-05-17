import React from 'react';

import * as Actions from 'actions/Actions';
import SiteDataStore from 'stores/SiteDataStore';

import StatusTableRowItem_checkBox from './StatusTableRowItem_checkBox';
import StatusTableRowItem_url from './StatusTableRowItem_url';
import StatusTableRowItem_statusCode from './StatusTableRowItem_statusCode';
import StatusTableRowItem_status from './StatusTableRowItem_status';
import StatusTableRowItem_responseTime from './StatusTableRowItem_responseTime';
import StatusTableRowItem_lastChecked from './StatusTableRowItem_lastChecked';
import StatusTableRowItem_buttons from './StatusTableRowItem_buttons';

class StatusTableRow extends React.Component {

    constructor() {
        super();
        this.state = {
            isRefreshing: false,
            isSelected: false
        }
        this.hideRefreshingInfo = this.hideRefreshingInfo.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.deselectRow = this.deselectRow.bind(this);
    }

    hideRefreshingInfo () {
        this.setState({
            isRefreshing: false
        });
    }

    componentWillMount() {
        SiteDataStore.on('change', this.hideRefreshingInfo);
    }

    componentWillUnmount() {
        SiteDataStore.removeListener('change', this.hideRefreshingInfo);
    }

    updateSingleSiteStatus() {

        this.setState({
            isRefreshing: true
        });

        Actions.updateSingleSiteStatus(this.props.site_data['site_id'])
    }

    removeSite() {
        if (!confirm('Czy na pewno usunąć witrynę ' + this.props.site_data['url'] + ' z monitora?')) return;
        else Actions.removeSite(this.props.site_data['site_id']);
    }

    selectRow() {
        this.setState({
            isSelected: true
        });
    }

    deselectRow() {
        this.setState({
            isSelected: false
        });
    }

    checkIfSiteWorking(http_code) {
        if((http_code >= 400 && http_code < 600) || http_code < 0 || http_code == 310) return false;
        else return true;
    }

    render() {
        
        const site_data = this.props.site_data;

        return (
            <tr className={
                this.checkIfSiteWorking(site_data['status_code']) ? (this.state.isSelected ? ' selected-row' : '') : ('not-working' + (this.state.isSelected ? ' selected-row' : ''))
            }>
                <StatusTableRowItem_checkBox site_id={site_data['site_id']} selectRow={this.selectRow} deselectRow={this.deselectRow}/>
                <StatusTableRowItem_url url={site_data['url']}/>
                <StatusTableRowItem_statusCode status_code={site_data['status_code']} short_desc={site_data['short_desc']} long_desc={site_data['long_desc']} site_id={site_data['site_id']} />
                <StatusTableRowItem_status status_code={site_data['status_code']} last_working_time={site_data['last_working_time']} />
                <StatusTableRowItem_responseTime last_response_time={site_data['last_response_time']}/>
                <StatusTableRowItem_lastChecked isRefreshing={this.state.isRefreshing} last_checked={site_data['last_checked']}/>
                <StatusTableRowItem_buttons url={site_data['url']} isRefreshing={this.state.isRefreshing} updateSingleSiteStatusFn={this.updateSingleSiteStatus.bind(this)} removeSiteFn={this.removeSite.bind(this)} />
            </tr>
        );
    }
}
  
export default StatusTableRow;