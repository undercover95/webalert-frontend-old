import React from 'react';

import { 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink
} from 'reactstrap';

import Title from '../Title';
import AddSinglePageForm from './AddSinglePageForm';
import AddMultiplePagesForm from './AddMultiplePagesForm';

export default class AddPage extends React.Component {

    constructor() {
        super();
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    componentDidMount() {
        document.title = 'Dodaj stronę | Monitor stron internetowych'
    }

    render() {
        return (
            <div>
                <Title title='Dodaj witrynę do monitora' icon='fa-plus-circle'/>

                <Nav tabs>
                    <NavItem>
                        <NavLink className={this.state.activeTab === '1' ? 'active' : '' } onClick={() => { this.toggle('1'); }} style={{'cursor': 'pointer'}}>
                        <i className="fa fa-file-o" aria-hidden="true"></i> Dodaj stronę
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === '2' ? 'active' : '' } onClick={() => { this.toggle('2'); }} style={{'cursor': 'pointer'}}>
                        <i className="fa fa-files-o" aria-hidden="true"></i> Dodaj wiele stron
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab} className='card card-body' style={{'borderTop': '0px'}}>
                    <TabPane tabId="1">
                        <AddSinglePageForm />
                    </TabPane>

                    <TabPane tabId="2">
                        <AddMultiplePagesForm />
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}