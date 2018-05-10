import React from 'react';

export default class StatusTableRowItem_responseTime extends React.Component {

    render() {
        
        const last_response_time = this.props.last_response_time;

        return (
            <td>
            {
                (last_response_time == null || last_response_time == '' || last_response_time == undefined) ? '-' : <span><i className="fa fa-clock-o" aria-hidden="true"></i> {last_response_time} s</span>
            }
            </td>
        );
    }
}