import React from 'react';

import ResponseStore from '../../../stores/ResponseStore';
import * as Actions from '../../../actions/Actions';

import AddSinglePageFormResponse from './AddSinglePageFormResponse';

export default class AddSinglePageForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.state = {
            beforeSend: '',
            response: {
                result: null,
                siteName: ''
            }
        };
    }

    getResponse() {
        this.setState({
            beforeSend: '',
            response: ResponseStore.getResponse('addSingleSiteResponse')
        });
    }

    componentWillMount() {
        ResponseStore.on('addSingleSiteResponse', this.getResponse)
    }

    componentWillUnmount() {
        ResponseStore.removeListener('addSingleSiteResponse', this.getResponse)
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        this.setState({
            beforeSend: <div className='mt-3'><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa dodawanie strony {data.get('url')}...</div>
        });

        Actions.addSingleSite(data.get('url'));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='addPage'>Adres witryny:</label>
                        <input type='text' id='addPage' name='url' className='form-control' placeholder='Wpisz adres witryny' required/>
                    </div>
                    <button type='submit' className='btn btn-primary'><i className='fa fa-plus-circle' aria-hidden='true'></i> Dodaj witrynę</button>
                </form>
                <span>{this.state.beforeSend}</span>
                <AddSinglePageFormResponse siteName={this.state.response.siteName} result={this.state.response.result} />
            </div>
        )
    }
}
