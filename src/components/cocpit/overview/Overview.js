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
        if (http_code == null) return;
        else if ((http_code >= 400 && http_code < 600) || http_code < 0 || http_code == 310) return false;
        else return true;
    }

    getCounters() {
        const siteData = this.props.data;
        console.log(this.props.data)
        return {
            all: siteData.length,
            notWorking: siteData.filter(siteDataElem => !this.checkIfSiteWorking(siteDataElem.status_code)).length,
            working: siteData.filter(siteDataElem => this.checkIfSiteWorking(siteDataElem.status_code)).length
        }
    }

    /*componentWillMount() {
        SiteDataStore.on('counterChange', this.getCounters);
    }

    componentWillUnmount() {
        SiteDataStore.removeListener('counterChange', this.getCounters);
    }*/

    componentDidMount() {
        console.log(this.props.data)
        this.setState({
            counters: this.getCounters()
        });
    }

    render() {
        return (
            <div className='row mb-4'>
                <div className='col-md-4'><OverviewItem counter={this.state.counters.all} type='pages-counter' description='Monitorowanych witryn' icon='fa-globe' /></div>
                <div className='col-md-4'><OverviewItem counter={this.state.counters.working} type='working-counter' description='Działających witryn' icon='fa-check-circle' /></div>
                <div className='col-md-4'><OverviewItem counter={this.state.counters.notWorking} type='not-working-counter' description='Nie działających witryn' icon='fa-times-circle' /></div>
            </div>
        );
    }
}

export default Overview;