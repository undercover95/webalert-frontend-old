import React from 'react';

import SiteDataStore from '../../../stores/SiteDataStore';
import * as Actions from '../../../actions/Actions';

import {
    NavLink as Link
  } from 'react-router-dom';

import StatusTableRow from './StatusTableRow';
//import StatusTableBottomToolbar from './StatusTableBottomToolbar';

class StatusTable extends React.Component {

    constructor() {
        super();
        this.state = {
            beforeSend: '',
            isRefreshing: false,
            data: []
        };
    }

    updateData() {
        this.setState({
            beforeSend: <span><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa odświeżanie...</span>,
            isRefreshing: true
        });

        Actions.updateAllSitesStatus()
    }

    componentWillMount() {
        SiteDataStore.on('change', () => {
            this.setState({
                beforeSend: '',
                data: SiteDataStore.getAllSitesData()
            });
        });
    }

    componentDidMount() {
        Actions.getLatestAllSitesStatus()
    }

    render() {
        let emptyData = false;

        if(this.state.data.length == 0) emptyData = true;

        return (
            <div>
                <h3>Aktualny stan witryn</h3>
                <div id='status-table-wrapper' className='table-responsive mb-3'>
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
                        emptyData ? (
                            <div className='alert alert-info'>
                            <h5 className='alert-heading'><i className='fa fa-info-circle'></i> Brak danych do wyświetlenia.</h5>
                            Aktualnie nie monitorujesz żadnych stron. Spróbuj <Link to='/addPage' className='alert-link'>dodać witryny</Link> do monitora.</div>
                        ) : ''
                    }
                </div>
                <button className='btn btn-info' onClick={this.updateData.bind(this)} disabled={this.state.beforeSend == '' ? false : true}>
                        {this.state.beforeSend == '' ? <span><i className='fa fa-refresh' aria-hidden='true'></i> Odśwież stan wszystkich witryn</span> : this.state.beforeSend}
                </button>
            </div>
        );
    }
}
  
export default StatusTable;