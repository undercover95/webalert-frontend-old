import React from 'react';

export default class StatusTableBottomToolbar extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='col-sm-4'>
                    <form id="selected-items-action-form">
                        <input type="checkbox" id="select-all" name="select-all"/> Zaznacz wszystkie widoczne<br/>
                        <label for="selected-items-action">Z zaznaczonymi: </label>
                        
                        <div className='row'>
                            <div className='col-sm-6'>
                                <select className="form-control form-control-sm" name="selected-items-action" id="selected-items-action">
                                    <option selected="selected">Wybierz działanie</option>
                                    <option>Usuń</option>
                                </select>
                            </div>
                            <div className='col-sm-6'>
                                <button type="submit" className="btn btn-primary btn-sm">Potwierdź</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='offset-sm-4 col-sm-4'>
                    <button id="refresh-pages-status" type="button" className="btn btn-info pull-right my-2">
                        <i className="fa fa-refresh" aria-hidden="true"></i> Odśwież stan witryn teraz!
                    </button>
                </div>
            </div>
        );
    }
}