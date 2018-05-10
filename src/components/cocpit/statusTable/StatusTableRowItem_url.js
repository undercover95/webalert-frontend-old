import React from 'react';

export default class StatusTableRowItem_url extends React.Component {

    render() {
        
        const url = this.props.url;

        return (
            <td>
                <a href={'http://'+url} target='_blank' title='Zobacz witrynę'>{url}</a>
            </td>
        );
    }
}