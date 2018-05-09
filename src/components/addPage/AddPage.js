import React from 'react';

import Title from '../Title';
import AddSinglePageForm from './AddSinglePageForm';
import AddMultiplePagesForm from './AddMultiplePagesForm';

export default class AddPage extends React.Component {

    render() {
        return (
            <div>
                <Title title='Dodaj witrynę' />
                
                <div className="card mb-3">
                    <div className="card-header"><i className="fa fa-file-o" aria-hidden="true"></i> Dodaj pojedynczą stronę
                    </div>
                    <div className="card-body">
                        <AddSinglePageForm />
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-header"><i className="fa fa-files-o" aria-hidden="true"></i> Dodaj wiele stron
                    </div>
                    <div className="card-body">
                        <AddMultiplePagesForm />
                    </div>
                </div>
            </div>
        )
    }
}