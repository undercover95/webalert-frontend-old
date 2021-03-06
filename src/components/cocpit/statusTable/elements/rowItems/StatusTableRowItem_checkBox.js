import React from 'react';

import * as Actions from 'actions/Actions';
import SiteDataStore from 'stores/SiteDataStore';

export default class StatusTableRowItem_checkBox extends React.Component {

    constructor() {
        super();
        this.state = {
            isChecked: false
        }
        this.makeCheck = this.makeCheck.bind(this);
        this.makeUncheck = this.makeUncheck.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    handleCheckBoxChange(event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            this.makeCheck()
        }
        else {
            this.makeUncheck()
        }
    }

    makeCheck() {
        this.props.selectRow();
        this.setState({
            isChecked: true
        });
        Actions.collectCheckedSite(this.site_id);
    }

    makeUncheck() {
        this.props.deselectRow();
        this.setState({
            isChecked: false
        });
        Actions.removeCheckedSite(this.site_id);
    }

    /*componentWillMount() {
        SiteDataStore.on('checkAllSites', this.makeCheck);
        SiteDataStore.on('uncheckAllSites', this.makeUncheck);
    }

    componentWillUnmount() {
        SiteDataStore.removeListener('checkAllSites', this.makeCheck);
        SiteDataStore.removeListener('uncheckAllSites', this.makeUncheck);
    }*/

    componentDidMount() {
        this.site_id = this.props.site_id;
    }

    render() {
        return (
            <td>
                <input onClick={this.handleCheckBoxChange} type='checkbox' checked={this.state.isChecked ? true : false} />
            </td>
        );
    }
}
