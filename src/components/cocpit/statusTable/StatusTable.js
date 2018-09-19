import React from 'react';

import {
    NavLink as Link
} from 'react-router-dom';

import {
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Alert,
    AlertHeading
} from 'reactstrap';

import StatusTableRow from './elements/StatusTableRow';
import StatusTableBottomToolbar from './elements/StatusTableBottomToolbar';

class StatusTable extends React.Component {

    constructor() {
        super();
        this.state = {
            search: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value.substr(0, 20)
        })
    }

    render() {
        let emptyData = false;
        let waitingForData = this.props.waitingForData;

        let siteData = this.props.data.filter(dataRow => {
            return dataRow.url.indexOf(this.state.search) !== -1;
        });

        if (siteData.length == 0) emptyData = true;

        return (
            <div className='card customCard'>
                <div className='card-header'>Aktualny stan witryn</div>
                <div className='card-body'>
                    {
                        !emptyData ? (
                            <InputGroup className={'mb-3'}>
                                <Input id="search-site" placeholder="&#xF002; Przefiltruj listę po adresie URL" value={this.state.search} onChange={this.updateSearch} />
                            </InputGroup>
                        ) : ''
                    }
                    <div id='status-table-wrapper' className={'table-responsive'}>
                        {
                            !waitingForData ? (
                                emptyData ? (
                                    <Alert color="info">
                                        <h5 className='alert-heading'><i className='fa fa-info-circle'></i> Brak danych do wyświetlenia.</h5>
                                        Aktualnie nie monitorujesz żadnych stron. Spróbuj <Link to='/addPage' className='alert-link'>dodać witryny</Link> do monitora.
                                    </Alert>
                                ) : ''
                            ) : (
                                    <Alert color="light"><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Pobieram aktualne dane...</Alert>
                                )

                        }
                        {
                            !emptyData ? (
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Adres URL</th>
                                            <th>Odp. serwera</th>
                                            <th>Stan witryny</th>
                                            <th>Czas odp.</th>
                                            <th>Ostatnie sprawdzenie</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            siteData.map(site_data => {
                                                return <StatusTableRow key={site_data.site_id} site_data={site_data} />
                                            })
                                        }
                                    </tbody>
                                </table>
                            ) : ''
                        }
                    </div>
                    {
                        !waitingForData ? (
                            !emptyData ? (
                                <StatusTableBottomToolbar />
                            ) : ''
                        ) : ''
                    }
                    {
                        !emptyData ? <span className={'float-right small font-weight-light font-italic pt-1'}><i className='fa fa-info-circle' aria-hidden='true'></i> Lista odświeża się automatycznie co minutę.</span> : ''
                    }
                </div>
            </div>
        );
    }
}

export default StatusTable;
