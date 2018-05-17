import React from 'react';

import * as Actions from 'actions/Actions';
import ReportsDataStore from 'stores/ReportsDataStore';

export default class ReportsTableRowItem_date extends React.Component {

    render() {
        return (
            <td>
                {this.props.report_time}
            </td>
        );
    }
}
  