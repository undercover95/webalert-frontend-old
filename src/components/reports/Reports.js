import React from 'react';

import Title from 'components/sections/Title';
import ReportsTable from './ReportsTable';

import ReportsDataStore from 'stores/ReportsDataStore';
import * as Actions from 'actions/Actions';

export default class Reports extends React.Component {

    period = 24;

    constructor() {
        super();
        this.state = {
            data: [],
            beforeSend: null
            //newReportsCounter: 0
        };
        this.getReportsData = this.getReportsData.bind(this);
        //this.getNewReportsCounter = this.getNewReportsCounter.bind(this);
    }

    componentWillMount() {
        ReportsDataStore.on('reportDataChange', this.getReportsData);
    }

    componentWillUnmount() {
        ReportsDataStore.removeListener('reportDataChange', this.getReportsData);
    }

    componentDidMount() {
        document.title = 'Raporty | Monitor stron internetowych'
        Actions.getReports(this.period);
    }

    getNewReportsCounter() {
        let counter = new Number(0);
        this.state.data.map(report_data => {
            if(report_data['is_seen'] == 0) counter += 1
        });
        return counter;
    }

    getReportsData() {
        this.setState({
            data: ReportsDataStore.getData(),
            beforeSend: null
        });
    }

    handleChange(event) {
        const period = event.target.value;
        this.period = period;

        this.setState({
            beforeSend: <div className='mt-3'><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Wczytuję dane...</div>
        })

        Actions.getReports(this.period);
    }

    render() {
        let emptyData = false;

        if(this.state.data.length == 0) emptyData = true;

        return (
            <div>
                <Title title={'Raporty ' + (this.getNewReportsCounter()==0 ? '' : ('('+this.getNewReportsCounter()+')'))} icon='fa-bullhorn' />

                <div className='card'>
                    <div className='card-header'>
                        <div className='form-inline'>
                            <div className='form-group'>
                                <label htmlFor='selectPeriod' className='mr-2'>Pokaż raporty z:</label>
                                <select className='form-control form-control-sm styled-select' id='selectPeriod' onChange={this.handleChange.bind(this)}>
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
                                        <h5 className='alert-heading'><i className='fa fa-info-circle'></i> Brak raportów do wyświetlenia.</h5>
                                        Brak raportów do wyświetlenia z wybranego okresu czasu.
                                    </div>
                                ) : (
                                    <div>
                                        <h4>Raporty <small>z ostatnich <strong>{this.period}</strong> godzin(y)</small></h4>
                                        <ReportsTable data={this.state.data} />


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
