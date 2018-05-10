import React from 'react';

export default class AddMultiplePagesFormResponse extends React.Component {

    arrayToStr(array, separator = ',') {
        let res = '';
        array.map((elem) => {
            res += elem + separator + ' ';
        });
    
        return res.substr(0, res.length - 2);
    }

    render() {
        const errors = this.props.errors;
        const addedSitesCount = this.props.addedSitesCount;
        let alertMsg = '';

        if (errors != null) {
            if(errors.length > 0 && errors.length == addedSitesCount) {
                // all pages failed
                const alertContent = <span><h5><i className='fa fa-exclamation-circle'></i> Coś poszło nie tak!</h5>Dodanie stron <strong>{this.arrayToStr(errors)}</strong> do monitora nie powiodło się!<br/>Prawdopodobnie strony istnieją już w monitorze lub wystąpił błąd serwera.</span>

                alertMsg = <div className='alert alert-danger' role='alert'>
                    {alertContent}
                </div>
            }
            else if(errors.length > 0 && errors.length != addedSitesCount) {
                // some of pages added, some not
                const alertContent = <span>
                    <h5><i className='fa fa-info-circle'></i> Uwaga:</h5>
                    Pomyślnie dodano <strong>{addedSitesCount - errors.length}</strong> stron do monitora, ale nie udało się dodać następujących witryn: <strong>{this.arrayToStr(errors)}</strong>.<br/>Prawdopodobnie te strony istnieją już w monitorze lub wystąpił błąd serwera.</span>

                alertMsg = <div className='alert alert-warning' role='alert'>
                    {alertContent}
                </div>
            }
            else {
                const alertContent = <span><h5><i className='fa fa-check-circle'></i> Ok</h5>Pomyślnie dodano <strong>{addedSitesCount}</strong> stron do monitora.</span>
                alertMsg = <div className='alert alert-success' role='alert'>
                    {alertContent}
                </div>
            }
        }

        return (
            errors != null ? <div className='mt-3'>{alertMsg}</div> : <div></div>
        )
    }
}