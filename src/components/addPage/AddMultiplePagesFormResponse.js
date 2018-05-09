import React from 'react';

export default class AddMultiplePagesFormResponse extends React.Component {

    render() {
        const resp = this.props.response;
        console.log("response state",resp);
        return (
            <p id='add-multiple-pages-results'>{resp}</p>
        )
    }
}