import React from 'react';
import humanizeDuration from 'humanize-duration';

const StatusTableRowItem_lastChecked = (props) => {

    const last_checked = props.last_checked;
    const status_code = props.status_code;

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