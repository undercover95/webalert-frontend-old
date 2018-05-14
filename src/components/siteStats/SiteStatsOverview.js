import React from 'react';
import SiteStatsOverviewItem from './SiteStatsOverviewItem';

export default class SiteStatsOverview extends React.Component {

    getAverageResponseTime() {
        const data = this.props.data;
        
        let sum = new Number(0.0);
        data.map(row => {
            sum = +sum + +row['last_response_time']
        });

        console.log('suma', sum);
        return (sum / data.length).toFixed(3);
    }

    render() {
        return (
            <div>
                <div className='row mb-3'>
                    <div className='col-sm-4'>
                        <SiteStatsOverviewItem val={this.getAverageResponseTime()} desc='Średni czas odpowiedzi serwera' icon='fa-clock-o'/>
                    </div>
                    <div className='col-sm-4'>
                        <SiteStatsOverviewItem val={0} desc='Działa nieprzerwanie' icon='fa-check-circle'/>
                    </div>
                    <div className='col-sm-4'>
                        <SiteStatsOverviewItem val={0} desc='Czas awarii' icon='fa-times-circle'/>
                    </div>
                </div>
            </div>
        )
    }
}