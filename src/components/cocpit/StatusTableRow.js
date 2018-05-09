import React from 'react';

import * as Actions from '../../actions/Actions';

class StatusTableRow extends React.Component {

    checkIfSiteWorking(http_code) {
        if((http_code >= 400 && http_code < 600) || http_code < 0 || http_code == 310) return false;
        else return true;
    }

    updateSingleSiteStatus() {
        Actions.updateSingleSiteStatus(this.props.site_data['url'])
    }

    removeSite() {
        if (!confirm("Czy na pewno usunąć witrynę " + this.props.site_data['url'] + " z monitora?")) return;
        else Actions.removeSite(this.props.site_data['site_id']);
    }

    render() {
        
        const site_data = this.props.site_data;

        return (
            <tr>
                <td>
                    <input className="select-site" type="checkbox"/>
                </td>

                <td>
                    <a href={'http://'+site_data['url']} target='_blank' title='Zobacz witrynę'>{site_data['url']}</a>
                </td>

                <td>
                {
                    (() => {
                        let code = site_data['status_code'];
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

                                <span className='status-code-description'>
                                    <small>
                                        {site_data['short_desc'] == null ? '' : site_data['short_desc']}
                                    </small>

                                {/*
                                    (code == null || code == undefined) ? '' :
                                    <a data-toggle='popover' title={site_data['short_desc'] == null ? 'NULL' : (code + ' - ' + site_data['short_desc'])} data-content={site_data['long_desc'] == null ? 'NULL' : site_data['long_desc']} data-trigger='focus' href='#!'>
                                        <i className='fa fa-question-circle' aria-hidden='true'></i>
                                    </a>
                                */}
                                </span>
                            </span>
                        )
                        return content;
                    })()
                }
                </td>

                <td>
                {
                    (() => {
                        let content = '';
                        let code = site_data['status_code'];
                        let NOT_DEFINED_STATUS = false;
                        // just added pages has no defined status, it needs to be checked
                        if (code == '' || code == null || code == undefined) {
                            NOT_DEFINED_STATUS = true;
                        }
    
                        if (NOT_DEFINED_STATUS) {
                            content = (
                                <div>
                                    <span>
                                        <i className="fa fa-question-circle" aria-hidden="true"></i> Nie określono
                                    </span>
                                </div>
                            )
                        } else if (!this.checkIfSiteWorking(code)) {
                            content = (
                                <div>
                                    <span className="not-working-text">
                                        <i className="fa fa-times-circle" aria-hidden="true"></i> Nie działa
                                    </span><br/>
                                    <small>Od: {site_data['last_working_time'] ? '' : 'Nie określono'}</small>
                                </div>
                            )
                        } else {
                            content = (
                                <div>
                                    <span className="working-text"><i className="fa fa-check-circle" aria-hidden="true"></i> Działa</span>
                                </div>
                            )
                        }
                        return content;
                    })()
                }

                </td>
                
                <td>
                {
                    (() => {
                        let content = '';
                        let time = site_data['last_response_time'];

                        content = (
                            (time == null || time == undefined) ? '-' : <i className="fa fa-clock-o" aria-hidden="true"> {time} s</i>
                        )
                        return content;
                    })()
                }
                </td>

                <td>
                    <span className="last-checked-time">{site_data['last_checked']}</span>
                </td>

                <td>
                    <div className="btn-group" role="group" aria-label="options">
                        <button type="button" onClick={this.updateSingleSiteStatus.bind(this)} title="Odśwież stan tej witryny" className="btn btn-sm btn-info refresh-page-status">
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </button>

                        <button type="button" className="btn btn-sm btn-light view-stats-btn" title="Pokaż statystyki dla tej witryny">
                            <i className="fa fa-pie-chart" aria-hidden="true"></i>
                        </button>

                        <button type="button" onClick={this.removeSite.bind(this)} title="Usuń tę witrynę z monitora" className="btn btn-sm btn-danger remove-page">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}
  
export default StatusTableRow;