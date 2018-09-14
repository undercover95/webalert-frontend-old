import React from 'react';
import OverviewItem from './OverviewItem';

import SiteDataStore from 'stores/SiteDataStore';

class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counters: {
                all: 0,
                working: 0,
                notWorking: 0
            }
        };
        this.checkIfSiteWorking = this.checkIfSiteWorking.bind(this);
        this.getCounters = this.getCounters.bind(this);
    }

    checkIfSiteWorking(http_code) {
        if (http_code == null) return -1;
        else if ((http_code >= 400 && http_code < 600) || http_code < 0 || http_code == 310) return 0;
        else return 1;
    }

    getCounters(siteData) {
        return {
            all: siteData.length,
            notWorking: siteData.filter(siteDataElem => this.checkIfSiteWorking(siteDataElem.status_code) == 0).length,
            working: siteData.filter(siteDataElem => this.checkIfSiteWorking(siteDataElem.status_code) == 1).length
        }
    }

    render() {
        const counters = this.getCounters(this.props.data)
        return (
            <div className='row mb-4'>
                <div className='col-md-4'><OverviewItem counter={counters.all} type='pages-counter' description='Monitorowanych witryn' icon='fa-globe' /></div>
                <div className='col-md-4'><OverviewItem counter={counters.working} type='working-counter' description='Działających witryn' icon='fa-check-circle' /></div>
                <div className='col-md-4'><OverviewItem counter={counters.notWorking} type='not-working-counter' inactive={counters.notWorking == 0} description='Nie działających witryn' icon='fa-times-circle' /></div>
            </div>
        );
    }
}

export default Overview;