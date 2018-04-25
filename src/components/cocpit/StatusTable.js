import React from 'react';

import StatusTableRow from './StatusTableRow';
//import StatusTableBottomToolbar from './StatusTableBottomToolbar';

require('babel-core/register');
require('babel-polyfill');
const axios = require('axios');

class StatusTable extends React.Component {

    async getStatusData() {
        const res = await axios.get('http://localhost/monitor_stron/engine/controller.php?action=getLastAllPagesStatus');
        const data = res.data;
        return data;
    }

    render() {
        /*const data = [{
            site_id: '1',
            url: 'test.com.pl',
            status_code: '404',
            last_response_time: '1.23',
            last_checked: '17:21 20-04-2018',
            short_desc: 'Not found',
            long_desc: 'Opis'
        }];*/

        return (
            <div className='table-responsive'>
                <table id='status-table' className='table table-striped'>
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
                    <tbody>
                    {
                        (()=>{
                            this.getStatusData().then(response => {
                                const data = response;
                                if(data.length != 0) {
                                    console.log("1");
                                    data.map(site_data => {
                                        return <StatusTableRow site_data={site_data} />
                                    })
                                }
                                else {
                                    console.log("2");
                                    return <tr>Brak danych do wyświetlenia.</tr>
                                }
                            })
                            .catch(err => {
                                console.log("3");
                                return <tr>Błąd podczas pobierania danych do wyświetlenia.</tr>
                            });
                        })()
                    }
                    </tbody>
                </table>
            </div>
        );
    }
  }
  
export default StatusTable;