import React from 'react';

export default class StatusTableRowItem_lastChecked extends React.Component {

    getElapsedTime(time) {
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
    
        var result = "";
        result += hours + ' ' + strings['h'] + ' ' + minutes + ' ' + strings['i'] + ' ' + seconds + ' ' + strings['s'] + " temu";
        return result;
    }

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