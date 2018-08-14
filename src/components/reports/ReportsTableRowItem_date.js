import React from 'react';

export default class ReportsTableRowItem_date extends React.Component {

    render() {
        return (
            <td>
                {this.props.report_time}
            </td>
        );
    }
}
