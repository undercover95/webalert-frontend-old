import React from 'react';
import PropTypes from 'prop-types';

const AddMultiplePagesFormResponse = (props) => {

    const arrayToStr = (array, separator = ',') => {
        let res = '';
        array.map((elem) => {
            res += elem + separator + ' ';
        });

        return res.substr(0, res.length - 2);
    }


    const errors = props.errors;
    const addedSitesCount = props.addedSitesCount;

    let alertMsg = '';

    if (errors != null) {
        if(errors.length > 0 && errors.length == addedSitesCount) {
            // all pages failed
            const alertContent = <span>
              <h5><i className='fa fa-exclamation-circle'></i> Coś poszło nie tak!</h5>
              Dodanie stron <strong>{arrayToStr(errors)}</strong> do monitora nie powiodło się!<br/>
              Prawdopodobnie strony istnieją już w monitorze lub wystąpił błąd serwera.
            </span>

            alertMsg = <div className='alert alert-danger' role='alert'>{alertContent}</div>
        }
        else if(errors.length > 0 && errors.length != addedSitesCount) {
            // some of pages added, some not
            const alertContent = <span>
                <h5><i className='fa fa-info-circle'></i> Uwaga:</h5>
                Pomyślnie dodano <strong>{addedSitesCount - errors.length}</strong> stron do monitora, ale nie udało się dodać następujących witryn: <strong>{arrayToStr(errors)}</strong>.<br/>Prawdopodobnie te strony istnieją już w monitorze lub wystąpił błąd serwera.</span>

            alertMsg = <div className='alert alert-warning' role='alert'>{alertContent}</div>
        }
        else {
            const alertContent = <span><h5><i className='fa fa-check-circle'></i> Ok</h5>Pomyślnie dodano <strong>{addedSitesCount}</strong> stron do monitora.</span>
            alertMsg = <div className='alert alert-success' role='alert'>{alertContent}</div>
        }
    }

    return (
        errors != null ? <div className='mt-3'>{alertMsg}</div> : <div></div>
    )
}

AddMultiplePagesFormResponse.propTypes = {
  errors: React.PropTypes.array,
  addedSitesCount: React.PropTypes.number
}

export default AddMultiplePagesFormResponse;
