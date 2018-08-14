import React from 'react';

export default class ReportsTableRowItem_name extends React.Component {

    render() {
        return (
            <td>
                {this.props.report_name}
            </td>
        );
    }
}
