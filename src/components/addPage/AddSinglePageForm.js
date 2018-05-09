import React from 'react';

import SiteDataStore from '../../stores/SiteDataStore';
import * as Actions from '../../actions/Actions';

export default class AddSinglePageForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        Actions.addSingleSite(data.get('url'));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="addPage">Adres witryny:</label>
                        <input type="text" id="addPage" name="url" className="form-control" placeholder="Wpisz adres witryny" required/>
                    </div>
                    <button type="submit" className="btn btn-primary"><i className="fa fa-plus-circle" aria-hidden="true"></i> Dodaj witrynę</button>
                </form>
                <div className="mt-3" id="add-single-page-results"></div>
            </div>
        )
    }
}