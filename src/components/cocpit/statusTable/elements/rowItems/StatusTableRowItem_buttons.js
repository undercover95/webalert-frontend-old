import React from 'react';

import {
    NavLink as Link
} from 'react-router-dom';

import {
    ButtonGroup,
    Button
} from 'reactstrap';

const StatusTableRowItem_buttons = (props) => {

    return (
        <td>
            <ButtonGroup>
                <Button onClick={() => props.updateSingleSiteStatusFn} className='btn btn-sm btn-info' title='Odśwież stan tej witryny' size='sm' disabled={props.isRefreshing ? true : false}>
                    <i className='fa fa-refresh' aria-hidden='true'></i>
                </Button>

                <Link to={'/siteStats/' + props.site_id} className='btn btn-sm btn-light' title='Pokaż statystyki dla tej witryny'>
                    <i className='fa fa-pie-chart' aria-hidden='true'></i>
                </Link>

                <Button onClick={() => props.removeSiteFn} className='btn btn-sm btn-danger' title='Usuń tę witrynę z monitora' size='sm'>
                    <i className='fa fa-times' aria-hidden='true'></i>
                </Button>
            </ButtonGroup>
        </td>
    );
}

StatusTableRowItem_buttons.propTypes = {
    updateSingleSiteStatusFn: React.PropTypes.func,
    isRefreshing: React.PropTypes.bool,
    site_id: React.PropTypes.number,
    removeSiteFn: React.PropTypes.func
}

export default StatusTableRowItem_buttons;