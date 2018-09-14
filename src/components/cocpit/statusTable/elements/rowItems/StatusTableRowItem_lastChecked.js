import React from 'react';
import dateFormat from 'dateformat';
import humanizeDuration from 'humanize-duration';
import { format } from 'url';

const StatusTableRowItem_lastChecked = (props) => {

    const last_checked = props.last_checked;
    const status_code = props.status_code;

    /*dateFormat.i18n = {
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
    };*/

    const polishHumanizer = humanizeDuration.humanizer({
        language: 'shortPl',
        round: true,
        languages: {
            shortPl: {
                y: () => 'lat',
                mo: () => 'mies',
                w: () => 'tyg',
                d: () => 'dni',
                h: () => 'godz',
                m: () => 'min',
                s: () => 's',
                ms: () => 'ms',
            }
        },
        largest: 2
    })

    let formatTime = (time) => {
        let now = Date.now();
        let timeMs = new Date(time).getTime();
        let diff = now - timeMs;

        return diff < 1000 ? 'teraz' : polishHumanizer(diff) + ' temu';
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