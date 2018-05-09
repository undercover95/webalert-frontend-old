import React from 'react';

import SiteDataStore from '../../stores/SiteDataStore';
import * as Actions from '../../actions/Actions';

import AddMultipleSitesResponse from './AddMultiplePagesFormResponse';

export default class AddMultiplePagesForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            response: null
        };
    }

    arrayToStr(array, separator = ',') {
        let res = '';
        array.map((elem) => {
            res += elem + separator + ' ';
        });
    
        return res.substr(0, res.length - 2);
    }

    componentWillMount() {
        console.log("componentWillMount");
        SiteDataStore.on('addMultipleSitesResponse', () => {
            console.log("addMultipleSitesResponse received");

            const errors = SiteDataStore.getResponse('addMultipleSitesResponse').errors;
            console.log("errors:",errors)

            this.setState({
                response: this.arrayToStr(errors)
            });

            /*
            if(errors.length != 0) {

                let alertContent = <span>Dodanie stron <strong>{this.arrayToStr(errors)}</strong> do monitora nie powiodło się!<br/>Prawdopodobnie strony istnieją już w monitorze lub wystąpił błąd serwera.</span>

                this.response = <div className='alert alert-warning alert-dismissible' role='alert'>
                    <button type='button' className='close' data-dismiss='alert' aria-label='Zamknij'>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    {alertContent}
                </div>
                console.log("response listener",this.response);
            }*/
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        Actions.addMultipleSites(data.get('urls'));
    }

    render() {
        console.log('RENDER');
        return (
            <div>
                <p><i className='fa fa-question-circle' aria-hidden='true'></i> Wpisz adresy witryn które chcesz dodać do monitora, <strong>wpisując je po przecinku.</strong><br/>Przykład: <span style={{'fontStyle': 'italic'}}>example.com.pl, example2.pl, example.org</span></p>

                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <textarea rows='5' cols='50' className='form-control' type='text' name='urls' placeholder='Wpisz adresy witryn po przecinku...' required></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary'><i className='fa fa-plus-circle' aria-hidden='true'></i> Dodaj wiele witryn</button>
                </form>
                <AddMultipleSitesResponse response={this.state.response} />
            </div>
        )
    }
}