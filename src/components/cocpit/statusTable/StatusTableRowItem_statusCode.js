import React from 'react';

export default class StatusTableRowItem_statusCode extends React.Component {

    render() {
        
        const status_code = this.props.status_code;

        return (
            <td>
            {
                (() => {
                    let code = status_code;
                    let badgeClass = 'badge-light';
                    let content = '';

                    if (code >= 100 && code < 200) {
                        // informations
                        badgeClass = 'badge-primary';
                    } else if (code >= 200 && code < 300) {
                        // successes
                        badgeClass = 'badge-success';
                    } else if (code >= 300 && code < 400) {
                        // redirections
                        badgeClass = 'badge-info';
                    } else if (code >= 400 && code < 500) {
                        // client errors
                        badgeClass = 'badge-warning';
                    } else if ((code >= 500 && code < 600) || (code == -1 || code == -2)) {
                        // server errors + DNS errors + unknown errors
                        badgeClass = 'badge-danger';
                    }

                    content = (
                        <span>
                            <span className={'badge ' + badgeClass}>
                                {(code == null || code == undefined ? '-' : code)}
                            </span>&nbsp;
                            {/*
                            <span className='status-code-description'>
                                <small>
                                    {site_data['short_desc'] == null ? '' : site_data['short_desc']}
                                </small>

                            
                                (code == null || code == undefined) ? '' :
                                <a data-toggle='popover' title={site_data['short_desc'] == null ? 'NULL' : (code + ' - ' + site_data['short_desc'])} data-content={site_data['long_desc'] == null ? 'NULL' : site_data['long_desc']} data-trigger='focus' href='#!'>
                                    <i className='fa fa-question-circle' aria-hidden='true'></i>
                                </a>
                             </span>
                            */}
                        </span>
                    )
                    return content;
                })()
            }
            </td>
        );
    }
}