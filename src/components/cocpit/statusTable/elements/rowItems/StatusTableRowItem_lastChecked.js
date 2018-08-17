import React from 'react';

const StatusTableRowItem_lastChecked = (props) => {

    const getElapsedTime = (time) => {
        const now = new Date();
        const ago = new Date(time);

        let diff = now - ago; // miliseconds
        diff /= 1000; // convert to seconds

        const seconds = Math.round(diff % 60);
        const minutes = Math.round(Math.floor(diff / 60) % 60); // remove seconds and get minutes
        const hours = Math.round(Math.floor(diff / 60) % 24); // remove minutes and get hours

        const strings = {
            'y': 'lat',
            'm': 'mies.',
            'w': 'tyg.',
            'd': 'dni',
            'h': 'godz.',
            'i': 'min.',
            's': 'sek.'
        }

        var result = '';
        result += hours + ' ' + strings['h'] + ' ' + minutes + ' ' + strings['i'] + ' ' + seconds + ' ' + strings['s'] + ' temu';
        return result;
    }


    const last_checked = props.last_checked;
    const isRefreshing = props.isRefreshing;

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

StatusTableRowItem_lastChecked.propTypes = {
    last_checked: React.PropTypes.string,
    isRefreshing: React.PropTypes.bool
}

export default StatusTableRowItem_lastChecked;