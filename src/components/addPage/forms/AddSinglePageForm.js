import React from 'react';

import ResponseStore from '../../../stores/ResponseStore';
import * as Actions from '../../../actions/Actions';

import AddSinglePageFormResponse from './AddSinglePageFormResponse';

export default class AddSinglePageForm extends React.Component {

    constructor() {
        super();
        this.state = {
            waiting: false,
            response: {
                result: null,
                siteName: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getResponse = this.getResponse.bind(this);
    }

    getResponse() {
        this.setState({
            waiting: false,
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
            waiting: true
        });

        Actions.addSingleSite(data.get('url'));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='addPage'>Adres witryny:</label>
                        <input type='text' id='addPage' name='url' className='form-control' placeholder='Wpisz adres witryny' required />
                    </div>
                    <button type='submit' className='btn btn-primary'><i className='fa fa-plus-circle' aria-hidden='true'></i> Dodaj witrynę</button>
                </form>
                {
                    this.state.waiting ? <div className='mt-3'><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa dodawanie strony...</div> : ''
                }
                <AddSinglePageFormResponse siteName={this.state.response.siteName} result={this.state.response.result} />
            </div>
        )
    }
}
