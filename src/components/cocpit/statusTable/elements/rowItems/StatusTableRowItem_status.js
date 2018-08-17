import React from 'react';

const StatusTableRowItem_status = (props) => {

    const checkIfSiteWorking = (http_code) => {
        if ((http_code >= 400 && http_code < 600) || http_code < 0 || http_code == 310) return false;
        else return true;
    }

    const status_code = props.status_code;
    const last_working_time = props.last_working_time;

    let content = '';
    let code = status_code;
    let NOT_DEFINED_STATUS = false;
    // just added pages has no defined status, it needs to be checked
    if (code == '' || code == null || code == undefined) {
        NOT_DEFINED_STATUS = true;
    }

    if (NOT_DEFINED_STATUS) {
        content = (
            <div>
                <span><i className='fa fa-question-circle' aria-hidden='true'></i> Nie określono</span>
            </div>
        )
    } else if (!checkIfSiteWorking(code)) {
        content = (
            <div>
                <span className='not-working-text'><i className='fa fa-times-circle' aria-hidden='true'></i> Nie działa</span><br />
                <small>Od: {last_working_time ? last_working_time : 'Nie określono'}</small>
            </div>
        )
    } else {
        content = (
            <div>
                <span className='working-text'><i className='fa fa-check-circle' aria-hidden='true'></i> Działa</span>
            </div>
        )
    }

    return (
        <td>{content}</td>
    );
}

StatusTableRowItem_status.propTypes = {
}

export default StatusTableRowItem_status;