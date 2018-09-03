import React from 'react';

import StatsStore from 'stores/StatsStore';
import SiteDataStore from 'stores/SiteDataStore';
import * as Actions from 'actions/Actions';

import SiteStatsTitle from './SiteStatsTitle';
import TimeResponseChart from './TimeResponseChart';
import SiteStatsOverview from './SiteStatsOverview';

export default class SiteStats extends React.Component {

    period = 24;

    constructor() {
        super();
        this.state = {
            data: [],
            beforeSend: null
        };
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        StatsStore.on('statsDataChange', this.getData);

    }

    componentWillUnmount() {
        StatsStore.removeListener('statsDataChange', this.getData);
    }

    componentDidMount() {
        this.siteUrl = SiteDataStore.getSiteUrlById(this.props.match.params.id);
        document.title = 'Statystyki witryny ' + this.siteUrl + ' | Monitor stron internetowych';
        Actions.getResponseTimeData(this.props.match.params.id, this.period);
    }

    getData() {
        this.setState({
            data: StatsStore.getData(),
            beforeSend: null
        });
    }

    getDataForChart() {
        let x_data = [];
        let y_data = [];

        this.state.data.map(row => {
            x_data.push(row['last_checked']);
            y_data.push(row['last_response_time']);
        });

        return {
            x: x_data,
            y: y_data
        }
    }

    handleChange(event) {
        const period = event.target.value;
        this.period = period;

        this.setState({
            beforeSend: <div className='mt-3'><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Wczytuję dane...</div>
        })

        Actions.getResponseTimeData(this.props.match.params.id, this.period);
    }

    render() {
        const site_id = this.props.match.params.id;

        let emptyData = false;

        if (this.state.data.length == 0) emptyData = true;

        return (
            <div>
                <SiteStatsTitle title='Statystyki witryny' sitename={this.siteUrl} icon='fa-pie-chart' />

                <div className='card'>
                    <div className='card-header'>
                        <div className='form-inline'>
                            <div className='form-group'>
                                <label htmlFor='selectPeriod' className='mr-2'>Pokaż dane z:</label>
                                <select className='form-control form-control-sm' id='selectPeriod' onChange={this.handleChange.bind(this)}>
                                    <option value='1'>ostatniej godziny</option>
                                    <option value='6'>ostatnich 6 godzin</option>
                                    <option value='12'>ostatnich 12 godzin</option>
                                    <option value='24' selected>ostatnich 24 godzin</option>
                                    <option value='48'>ostatnich 48 godzin</option>
                                    <option value='168'>ostatnich 7 dni</option>
                                    <option value='720'>ostatnich 30 dni</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        {
                            this.state.beforeSend == null ? (
                                emptyData ? (
                                    <div className='alert alert-info'>
                                        <h5 className='alert-heading'><i className='fa fa-info-circle'></i> Brak danych do wyświetlenia.</h5>
                                        Brak danych do wyświetlenia z wybranego okresu czasu.
                                    </div>
                                ) : (
                                        <div>
                                            <h4><i className='fa fa-check-circle' aria-hidden='true'></i> Podsumowanie <small>z ostatnich <strong>{this.period}</strong> godzin(y)</small></h4>
                                            <SiteStatsOverview data={this.state.data} />

                                            <h4><i className='fa fa-clock-o' aria-hidden='true'></i> Czas odpowiedzi serwera <small>z ostatnich <strong>{this.period}</strong> godzin(y)</small></h4>
                                            <TimeResponseChart data={this.getDataForChart()} />
                                        </div>
                                    )
                            ) : this.state.beforeSend
                        }

                    </div>
                </div>
            </div>
        )
    }
}
