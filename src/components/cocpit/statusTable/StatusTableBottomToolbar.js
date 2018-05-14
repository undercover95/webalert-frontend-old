import React from 'react';

import SiteDataStore from 'stores/SiteDataStore';
import * as Actions from 'actions/Actions';

export default class StatusTableBottomToolbar extends React.Component {

    constructor() {
        super();
        this.state = {
            checkedSites: []
        };
        this.getCheckedSites = this.getCheckedSites.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCheckedSites() {
        this.setState({
            checkedSites: SiteDataStore.getCheckedSites()
        });
        console.log("data", this.state.checkedSites);
    }

    componentWillMount() {
        SiteDataStore.on('checkedSiteChange', this.getCheckedSites);
    }

    componentWillUnmount() {
        SiteDataStore.removeListener('checkedSiteChange', this.getCheckedSites);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        switch(data.get('operation')) {
            case '1':
                // refresh checked
                console.log('refresh checked', this.state);
                this.state.checkedSites.map(site_id => {
                    ((site_id) => {
                        Actions.updateSingleSiteStatus(site_id);
                    })(site_id);
                });
                break;
            case '2':
                // remove checked
                console.log('remove checked');
                if (confirm('Czy na pewno usunąć wybrane witryny z monitora?')) {
                    this.state.checkedSites.map(site_id => {
                        ((site_id) => {
                            Actions.removeSite(site_id);
                        })(site_id);
                    });
                }
                break;
        }
            
    }

    render() {

        const beforeSend = this.props.beforeSend;
        const updateData = this.props.updateData;

        return (
            <div className='row' id='bottom-table-toolbar'>
                <div className='col-8'>
                    <form id='selected-items-action-form' className='form-inline' onSubmit={this.handleSubmit}>
                        <div className='form-group mr-5'>
                            <input className='form-control form-control-sm' id='selectAll' name='select-all' type='checkbox'/>
                            <label htmlFor='selectAll' className='ml-1'>
                                Zaznacz wszystkie
                            </label>
                        </div>
                        <div className='form-group mr-2'>
                            <label htmlFor='exampleSelect2' className='mr-2'>Z zaznaczonymi:</label>
                            <select name='operation' className='form-control form-control-sm styled-select' id='exampleSelect2'>
                                <option value='0'>Wybierz opcję</option>
                                <option value='1'>Odśwież zaznaczone</option>
                                <option value='2'>Usuń zaznaczone</option>
                            </select>
                        </div>
                        <button className='btn btn-sm badge-primary' type='submit'>Potwierdź</button>
                    </form>
                </div>
                <div className='col-4 text-right'>
                    <button className='btn btn-sm btn-info' onClick={updateData} disabled={beforeSend == '' ? false : true}>
                            {beforeSend == '' ? <span><i className='fa fa-refresh' aria-hidden='true'></i> Odśwież stan wszystkich witryn</span> : beforeSend}
                    </button>
                </div>
            </div>
        );
    }
}