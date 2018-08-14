import React from 'react';

import {
    NavLink as Link
  } from 'react-router-dom';

import {
  ButtonGroup,
  Button
} from 'reactstrap';

export default class StatusTableRowItem_buttons extends React.Component {

    render() {
        return (
            <td>
              <ButtonGroup>
                    <Button onClick={() => this.props.updateSingleSiteStatusFn} className='btn btn-sm btn-info' title='Odśwież stan tej witryny' size='sm' disabled={this.props.isRefreshing ? true : false}>
                        <i className='fa fa-refresh' aria-hidden='true'></i>
                    </Button>

                    <Link to={'/siteStats/'+this.props.site_id} className='btn btn-sm btn-light' title='Pokaż statystyki dla tej witryny'>
                        <i className='fa fa-pie-chart' aria-hidden='true'></i>
                    </Link>

                    <Button onClick={() => this.props.removeSiteFn} className='btn btn-sm btn-danger' title='Usuń tę witrynę z monitora' size='sm'>
                        <i className='fa fa-times' aria-hidden='true'></i>
                    </Button>
                </ButtonGroup>
            </td>
        );
    }
}
