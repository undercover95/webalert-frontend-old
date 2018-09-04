import React from 'react';

const StatusTableRowItem_url = ({ url }) => {

    let getUrl = (url) => {
        if (url.startsWith('http' || url.startsWith('https'))) return url;
        else return 'http://' + url;
    }

    return (
        <td>
            <a className={'see-site'} href={getUrl(url)} target='_blank' title='Zobacz witrynę'>{url}</a>
        </td>
    );
}

StatusTableRowItem_url.propTypes = {
    url: React.PropTypes.string
}

export default StatusTableRowItem_url;
