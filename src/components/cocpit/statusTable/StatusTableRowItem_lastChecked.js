import React from 'react';

export default class StatusTableRowItem_lastChecked extends React.Component {

    render() {
        
        const last_checked = this.props.last_checked;
        const isRefreshing = this.props.isRefreshing;

        return (
            <td>
            <span className='last-checked-time'>{
                isRefreshing ? (
                    <span><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa odświeżanie</span>
                ) : last_checked
            }</span>
        </td>
        );
    }
}