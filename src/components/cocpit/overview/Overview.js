import React from 'react';
import OverviewItem from './OverviewItem';

import SiteDataStore from 'stores/SiteDataStore';

class Overview extends React.Component {

    constructor() {
        super();
        this.state = {
            counters: {
                all: 0,
                working: 0,
                notWorking: 0
            }
        };
        this.getCounters = this.getCounters.bind(this);
    }

    getCounters() {
        this.setState({
            counters: SiteDataStore.getCounters()
        });
    }

    componentWillMount() {
        SiteDataStore.on('counterChange', this.getCounters);
    }



    componentWillUnmount() {
        SiteDataStore.removeListener('counterChange', this.getCounters);
    }

    componentDidMount() {
        this.getCounters();
    }

    render() {
        return (
            <div className='row mb-5'>
                <div className='col-md-4'><OverviewItem counter={this.state.counters.all} type='pages-counter' description='Monitorowanych witryn' icon='fa-globe'/></div>
                <div className='col-md-4'><OverviewItem counter={this.state.counters.working} type='working-counter' description='Działających witryn' icon='fa-check-circle'/></div>
                <div className='col-md-4'><OverviewItem counter={this.state.counters.notWorking} type='not-working-counter' description='Nie działających witryn' icon='fa-times-circle'/></div>
            </div>
        );
    }
  }
  
export default Overview;