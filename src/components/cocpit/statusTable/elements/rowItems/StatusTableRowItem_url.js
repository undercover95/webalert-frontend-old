import React from 'react';

const StatusTableRowItem_url = ({ url }) => {
    return (
        <td>
            <a className={'see-site'} href={'http://' + url} target='_blank' title='Zobacz witrynę'>{url}</a>
        </td>
    );
}

StatusTableRowItem_url.propTypes = {
    url: React.PropTypes.string
}

export default StatusTableRowItem_url;
