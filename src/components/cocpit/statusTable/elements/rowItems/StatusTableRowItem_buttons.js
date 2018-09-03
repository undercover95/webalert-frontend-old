import React from 'react';

import {
    NavLink as Link
} from 'react-router-dom';

import {
    ButtonGroup,
    Button
} from 'reactstrap';

import * as Actions from 'actions/Actions';
import SiteDataStore from 'stores/SiteDataStore';
class StatusTableRowItem_buttons extends React.Component {

    constructor() {
        super();
        this.state = {
            isRefreshing: false
        }
        this.hideRefreshingInfo = this.hideRefreshingInfo.bind(this);
        this.updateSingleSiteStatus = this.updateSingleSiteStatus.bind(this);
        this.removeSite = this.removeSite.bind(this);
    }

    componentWillMount() {
        SiteDataStore.on('singleSiteStatusUpdated_id=' + this.props.site_id, this.hideRefreshingInfo);
    }

    componentWillUnmount() {
        SiteDataStore.removeListener('singleSiteStatusUpdated_id=' + this.props.site_id, this.hideRefreshingInfo);
    }

    hideRefreshingInfo() {
        this.setState({
            isRefreshing: false
        });
    }

    updateSingleSiteStatus() {
        this.setState({
            isRefreshing: true
        });

        Actions.updateSingleSiteStatus(this.props.site_id)
    }

    removeSite() {
        if (!confirm('Czy na pewno usunąć witrynę ' + this.props.site_url + ' z monitora?')) return;
        else Actions.removeSite(this.props.site_id);
    }

    render() {
        return (
            <td>
                <ButtonGroup>
                    <Button onClick={() => this.updateSingleSiteStatus()} className='btn btn-sm btn-info' title='Odśwież stan tej witryny' size='sm' disabled={this.state.isRefreshing ? true : false}>
                        {
                            this.state.isRefreshing ? (
                                <i className='fa fa-spinner fa-spin' aria-hidden='true'></i>
                            ) : (
                                    <i className='fa fa-refresh' aria-hidden='true'></i>
                                )
                        }
                    </Button>

                    <Link to={'/siteStats/' + this.props.site_id} className='btn btn-sm btn-light' title='Pokaż statystyki dla tej witryny'>
                        <i className='fa fa-pie-chart' aria-hidden='true'></i>
                    </Link>

                    <Button onClick={() => this.removeSite()} className='btn btn-sm btn-danger' title='Usuń tę witrynę z monitora' size='sm'>
                        <i className='fa fa-times' aria-hidden='true'></i>
                    </Button>
                </ButtonGroup>
            </td>
        );
    }
}

StatusTableRowItem_buttons.propTypes = {
}

export default StatusTableRowItem_buttons;