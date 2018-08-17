import React from 'react';

import SiteDataStore from 'stores/SiteDataStore';
import * as Actions from 'actions/Actions';

import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class StatusTableBottomToolbar extends React.Component {

    constructor() {
        super();
        this.state = {
            checkedSites: []
        };
        this.getCheckedSites = this.getCheckedSites.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCheckedSites() {
        this.setState({
            checkedSites: SiteDataStore.getCheckedSites()
        });
        console.log('checked sites', this.state.checkedSites);
    }

    componentWillMount() {
        SiteDataStore.on('checkedSiteChange', this.getCheckedSites);
    }

    componentWillUnmount() {
        SiteDataStore.removeListener('checkedSiteChange', this.getCheckedSites);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        switch(data.get('operation')) {
            case '1':
                // refresh checked
                console.log('refresh checked', this.state);
                this.state.checkedSites.map(site_id => {
                    ((site_id) => {
                        Actions.updateSingleSiteStatus(site_id);
                    })(site_id);
                });
                break;
            case '2':
                // remove checked
                console.log('remove checked');
                if (confirm('Czy na pewno usunąć wybrane witryny z monitora?')) {
                    this.state.checkedSites.map(site_id => {
                        ((site_id) => {
                            Actions.removeSite(site_id);
                        })(site_id);
                    });
                }
                break;
        }

    }

    handleCheckBoxChange(event) {
        const isChecked = event.target.checked;
        if(isChecked){
            Actions.checkAllSites();
        }
        else {
            Actions.uncheckAllSites();
        }
    }

    render() {

        const beforeSend = this.props.beforeSend;
        const updateData = this.props.updateData;

        return (
            <Row id='bottom-table-toolbar'>
                <Col md={8}>
                    <div className='form-inline'>
                        <input onClick={this.handleCheckBoxChange.bind(this)} id='selectAll' name='select-all' type='checkbox'/>
                        <Label for="selectAll" className='ml-1 mr-5'>Zaznacz wszystkie</Label>

                        <Form className='form-inline' onSubmit={this.handleSubmit}>
                        <FormGroup className='mr-2'>
                            <Label for='selectOperation' className='mr-2'>Z zaznaczonymi:</Label>
                              <Input type="select" name="operation" id="selectOperation" className='styled-select'>
                                <option value='0'>Wybierz opcję</option>
                                <option value='1'>Odśwież zaznaczone</option>
                                <option value='2'>Usuń zaznaczone</option>
                              </Input>
                        </FormGroup>
                        <Button color='primary' size='sm'>Potwierdź</Button>
                    </Form>
                    </div>
                </Col>
                <Col md={4} className='text-right'>
                    <Button color='info' size='sm' onClick={() => updateData()} disabled={beforeSend == '' ? false : true}>
                            {beforeSend == '' ? <span><i className='fa fa-refresh' aria-hidden='true'></i> Odśwież stan wszystkich witryn</span> : beforeSend}
                    </Button>
                </Col>
            </Row>
        );
    }
}
