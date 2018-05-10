import React from 'react';

export default class AddSinglePageFormResponse extends React.Component {

    render() {
        const result = this.props.result;
        const siteName = this.props.siteName;
        let alertMsg = '';

        if(result) {
            const alertContent = <span><h5 className='alert-heading'><i className='fa fa-check-circle'></i> Ok</h5>Pomyślnie dodano stronę <strong>{siteName}</strong> do monitora.</span>
            alertMsg = <div className='alert alert-success' role='alert'>
                {alertContent}
            </div>
        }
        else {
            const alertContent = <span><h5 className='alert-heading'><i className='fa fa-exclamation-circle'></i> Coś poszło nie tak!</h5>Dodanie strony <strong>{siteName}</strong> do monitora nie powiodło się!<br/>Prawdopodobnie strona istnieje już w monitorze lub wystąpił błąd serwera.</span>

            alertMsg = <div className='alert alert-danger' role='alert'>
                {alertContent}
            </div>
        }

        return (
            result != null ? <div className='mt-3'>{alertMsg}</div> : <div></div>
        )
    }
}