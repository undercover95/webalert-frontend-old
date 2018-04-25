import React from 'react';
import OverviewItem from './OverviewItem';

class Overview extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4"><OverviewItem type='pages-counter' description='Monitorowanych witryn' icon='fa-globe'/></div>
                <div className="col-md-4"><OverviewItem type='working-counter' description='Działających witryn' icon='fa-check-circle'/></div>
                <div className="col-md-4"><OverviewItem type='not-working-counter' description='Nie działających witryn' icon='fa-times-circle'/></div>
            </div>
        );
    }
  }
  
export default Overview;