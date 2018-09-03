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


import TopBar from './sections/TopBar';

import Cocpit from './cocpit/Cocpit';
import AddPage from './addPage/AddPage';
import SiteStats from './siteStats/SiteStats';
import Reports from './reports/Reports';

import Login from './auth/Login';
import Logout from './auth/Logout';
import Register from './auth/Register';
import Sidebar from 'components/sections/Sidebar';

require('styles/style.scss');

class Main extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Container fluid={true}>
            <Row>
              <Col>
                <TopBar />
              </Col>
            </Row>
          </Container>

          <Container className={'mainContainer mb-5'}>
            <Row>
              <Col>
                <Switch>
                  <PrivateRoute exact path='/' component={Cocpit} />
                  <PrivateRoute path='/addPage' component={AddPage} />
                  <PrivateRoute path='/siteStats/:id' component={SiteStats} />
                  <PrivateRoute path='/reports' component={Reports} />
                  <PrivateRoute path='/logout' component={Logout} />

                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                </Switch>
              </Col>
            </Row>

          </Container>
        </div>
      </Router>
    );
  }
}

export default Main;
