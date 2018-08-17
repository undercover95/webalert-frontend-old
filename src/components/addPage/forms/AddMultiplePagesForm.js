import React from 'react';

import ResponseStore from '../../../stores/ResponseStore';
import * as Actions from '../../../actions/Actions';

import AddMultiplePagesFormResponse from './AddMultiplePagesFormResponse';

export default class AddMultiplePagesForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.state = {
            beforeSend: '',
            response: {
                addedSitesCount: 0,
                errors: null
            }
        };
    }

    getResponse() {
        this.setState({
            beforeSend: '',
            response: ResponseStore.getResponse('addMultipleSitesResponse')
        });
    }

    componentWillMount() {
        ResponseStore.on('addMultipleSitesResponse', this.getResponse)
    }

    componentWillUnmount() {
        ResponseStore.removeListener('addMultipleSitesResponse', this.getResponse)
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        this.setState({
            beforeSend: <div className='mt-3'><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa dodawanie stron...</div>
        });

        Actions.addMultipleSites(data.get('urls'));
    }

    render() {
        return (
            <div>
                <p><i className='fa fa-question-circle' aria-hidden='true'></i> Wpisz adresy witryn które chcesz dodać do monitora, <strong>wpisując je po przecinku.</strong><br/>Przykład: <span style={{'fontStyle': 'italic'}}>example.com.pl, example2.pl, example.org</span></p>

                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <textarea rows='5' cols='50' className='form-control' type='text' name='urls' placeholder='Wpisz adresy witryn po przecinku...' required></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary'><i className='fa fa-plus-circle' aria-hidden='true'></i> Dodaj wiele witryn</button>
                </form>
                <span>{this.state.beforeSend}</span>
                <AddMultiplePagesFormResponse addedSitesCount={this.state.response.addedSitesCount} errors={this.state.response.errors} />
            </div>
        )
    }
}
