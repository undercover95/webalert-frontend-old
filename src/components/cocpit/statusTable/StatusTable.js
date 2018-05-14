import React from 'react';

import SiteDataStore from 'stores/SiteDataStore';
import * as Actions from 'actions/Actions';

import {
    NavLink as Link
  } from 'react-router-dom';

import StatusTableRow from './StatusTableRow';
import StatusTableBottomToolbar from './StatusTableBottomToolbar';

class StatusTable extends React.Component {
    
    interval = 0;

    constructor() {
        super();
        this.state = {
            beforeSend: '',
            waitingForData: false,
            isRefreshing: false,
            data: []
        };
        this.getData = this.getData.bind(this);
    }

    updateData() {
        this.setState({
            beforeSend: <span><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa odświeżanie...</span>,
            isRefreshing: true
        });

        Actions.updateAllSitesStatus()
    }

    getData() {
        console.log("data received");
        this.setState({
            beforeSend: '',
            waitingForData: false,
            data: SiteDataStore.getAllSitesData()
        });
    }

    componentWillMount() {
        SiteDataStore.on('change', this.getData);
    }

    componentWillUnmount() {
        //clearInterval(this.cyclicUpdateIntervalId);
        SiteDataStore.removeListener('change', this.getData);
    }

    componentDidMount() {
        this.interval = 10;
        //console.log("data request sent");

        this.setState({
            waitingForData: true
        });

        Actions.getLatestAllSitesStatus();
        /*this.cyclicUpdateIntervalId = setInterval(() => {
            Actions.getLatestAllSitesStatus();
            console.log('updated');
        }, this.interval*1000);*/
    }



    render() {
        let emptyData = false;
        let waitingForData = this.state.waitingForData;

        if(this.state.data.length == 0) emptyData = true;

        return (
            <div>
                <div className='row'>
                    <div className='col'>
                        <h3>Aktualny stan witryn</h3>
                    </div>
                    <div className='col text-right'>
                        <span style={{'lineHeight': '41px', 'fontStyle':'italic'}}><i className='fa fa-info-circle' aria-hidden='true'></i> Dane w tabeli odświeżane są automatycznie co {this.interval} sekund.</span>
                    </div>
                </div>
                
                <div id='status-table-wrapper' className='table-responsive'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Adres URL</th>
                                <th>Kod HTTP</th>
                                <th>Stan witryny</th>
                                <th>Czas odp.</th>
                                <th>Ostatnie sprawdzenie</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{
                            !emptyData ? (
                                this.state.data.map(site_data => {
                                    return <StatusTableRow key={site_data.site_id} site_data={site_data} />
                                })
                            ) : ''
                        }
                        </tbody>
                    </table>
                    {
                        !waitingForData ? (
                            emptyData ? (
                                <div className='alert alert-info'>
                                <h5 className='alert-heading'><i className='fa fa-info-circle'></i> Brak danych do wyświetlenia.</h5>
                                Aktualnie nie monitorujesz żadnych stron. Spróbuj <Link to='/addPage' className='alert-link'>dodać witryny</Link> do monitora.</div>
                            ) : ''
                        ) : (
                            <span><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Pobieram aktualne dane...</span>
                        )

                    }
                </div>
                {
                    !waitingForData ? (
                        !emptyData ? (
                            <StatusTableBottomToolbar updateData={this.updateData.bind(this)} beforeSend={this.state.beforeSend}/>
                        ) : ''
                    ) : ''
                }
            </div>
        );
    }
}
  
export default StatusTable;