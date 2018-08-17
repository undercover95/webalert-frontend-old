import React from 'react';

const StatusTableRowItem_responseTime = (props) => {

    const last_response_time = props.last_response_time;

    return (
        <td>
            {
                (last_response_time == null || last_response_time == '' || last_response_time == undefined) ? '-' : <span><i className='fa fa-clock-o' aria-hidden='true'></i> {last_response_time} s</span>
            }
        </td>
    );
}

StatusTableRowItem_responseTime.propTypes = {
    last_response_time: React.PropTypes.number
}

export default StatusTableRowItem_responseTime;