import React from 'react';

import SiteDataStore from '../../stores/SiteDataStore';
import * as Actions from '../../actions/Actions';

import StatusTableRow from './StatusTableRow';
//import StatusTableBottomToolbar from './StatusTableBottomToolbar';

class StatusTable extends React.Component {

    constructor() {
        super();
        this.state = {
            beforeSend: '',
            data: []
        };
    }

    updateData() {
        this.setState({
            beforeSend: <span><i className="fa fa-spinner fa-spin" aria-hidden="true"></i> Trwa odświeżanie...</span>
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
        return (
            <div>
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
                                this.state.data.length != 0 ? (
                                    this.state.data.map(site_data => {
                                        //console.log('dataTable: ',site_data)
                                        return <StatusTableRow key={site_data.site_id} site_data={site_data} />
                                    })
                                ) : console.log('StatusTable -> this.state.data is empty!')
                        }
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-info' onClick={this.updateData.bind(this)}> {this.state.beforeSend == '' ? <span><i className="fa fa-refresh" aria-hidden="true"></i> Odśwież stan wszystkich witryn</span> : this.state.beforeSend}</button>
            </div>
        );
    }
}
  
export default StatusTable;