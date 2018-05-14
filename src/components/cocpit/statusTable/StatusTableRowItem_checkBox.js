import React from 'react';

import * as Actions from 'actions/Actions';
import SiteDataStore from 'stores/SiteDataStore';

export default class StatusTableRowItem_checkBox extends React.Component {

    site_id = -1;

    handleCheckBoxChange(event) {
        const isChecked = event.target.checked;
        if(isChecked){
            Actions.collectCheckedSite(this.site_id);
        }
        else {
            Actions.removeCheckedSite(this.site_id);
        }
    }

    componentWillMount() {
        this.site_id = this.props.site_id;
    }

    render() {
        const handleCheckBoxChange = this.props.handleCheckBoxChange;
        return (
            <td>
                <input onClick={this.handleCheckBoxChange.bind(this)} type='checkbox'/>
            </td>
        );
    }
}