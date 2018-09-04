import React from 'react';
import dateFormat from 'dateformat';
import { format } from 'url';

const StatusTableRowItem_lastChecked = (props) => {

    const last_checked = props.last_checked;
    const status_code = props.status_code;

    dateFormat.i18n = {
        dayNames: [
            'Nie', 'Pon', 'Wt', 'Śro', 'Czw', 'Pt', 'Sob',
            'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'
        ],
        monthNames: [
            'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru',
            'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
        ],
        timeNames: [
            'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
        ]
    };

    let formatTime = (time) => {
        return dateFormat(time, "isoTime") + ' ' + dateFormat(time, "mediumDate")
    }

    return (
        <td>
            <span className='last-checked-time'>{status_code != null ? formatTime(last_checked) : '-'}</span>
        </td>
    );
}

StatusTableRowItem_lastChecked.propTypes = {
    last_checked: React.PropTypes.string,
    isRefreshing: React.PropTypes.bool
}

export default StatusTableRowItem_lastChecked;