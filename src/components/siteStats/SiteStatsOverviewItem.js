import React from 'react';

export default class SiteStatsOverviewItem extends React.Component {

    render() {
        const val = this.props.val;
        const desc = this.props.desc;
        const icon = this.props.icon;

        return (
            <div className='statsOverview mb-3' id='averageResponseTimeIndicator'>
                <span className='badge badge-info'><i className={'fa '+icon} aria-hidden='true'></i> {val} s</span><br/>
                <div className='badge badge-info statsOverviewDescription'>{desc}</div>
            </div>
        )
    }
}