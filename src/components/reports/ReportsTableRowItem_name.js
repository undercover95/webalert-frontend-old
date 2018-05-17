import React from 'react';

import * as Actions from 'actions/Actions';
import ReportsDataStore from 'stores/ReportsDataStore';

export default class ReportsTableRowItem_name extends React.Component {

    render() {
        return (
            <td>
                {this.props.report_name}
            </td>
        );
    }
}
  