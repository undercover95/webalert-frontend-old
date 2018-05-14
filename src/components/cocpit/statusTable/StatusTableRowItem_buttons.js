import React from 'react';

import {
    NavLink as Link
  } from 'react-router-dom';


export default class StatusTableRowItem_buttons extends React.Component {

    render() {
        return (
            <td>
                <div className='btn-group' role='group' aria-label='options'>
                    <button type='button' onClick={this.props.updateSingleSiteStatusFn} title='Odśwież stan tej witryny' className='btn btn-sm btn-info' disabled={this.props.isRefreshing ? true : false}>
                        <i className='fa fa-refresh' aria-hidden='true'></i>
                    </button>

                    <Link to={'/siteStats/'+this.props.url} className='btn btn-sm btn-light' title='Pokaż statystyki dla tej witryny'>
                        <i className='fa fa-pie-chart' aria-hidden='true'></i>
                    </Link>

                    <button type='button' onClick={this.props.removeSiteFn} title='Usuń tę witrynę z monitora' className='btn btn-sm btn-danger'>
                        <i className='fa fa-times' aria-hidden='true'></i>
                    </button>
                </div>
            </td>
        );
    }
}