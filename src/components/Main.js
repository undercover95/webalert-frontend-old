import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import {
  Row,
  Col,
  Container
} from 'reactstrap';


import TopBar from './TopBar';

import Cocpit from './cocpit/Cocpit';
import AddPage from './addPage/AddPage';
import SiteStats from './siteStats/SiteStats';
import Reports from './reports/Reports';

import Login from './loginPage/Login';
import Register from './registerPage/Register';
import Sidebar from 'components/Sidebar';
import axios from 'axios';
import * as Actions from 'actions/Actions';
require('styles/style.scss');

class Main extends React.Component {

  isLogged = false;

  componentDidMount() {


  }

  render() {
    return (
      <Router>
        <Container fluid='true'>
          <Row>
            <Col>
              <TopBar/>
            </Col>
          </Row>
          <Sidebar/>
          <Row className='content'>
            <Col className='mb-4'>
              <Switch>
                <PrivateRoute exact path='/' component={Cocpit} />
                <PrivateRoute path='/addPage' component={AddPage} />
                <PrivateRoute path='/siteStats/:id' component={SiteStats} />
                <PrivateRoute path='/reports' component={Reports} />

                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route render={
                  () => <h3>Page not found!</h3>
                } />
              </Switch>
            </Col>
        </Row>
        </Container>
      </Router>
    );
  }
}

export default Main;
