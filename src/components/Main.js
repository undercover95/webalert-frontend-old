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

import Login from './loginPage/Login';
import Register from './registerPage/Register';
import Sidebar from 'components/sections/Sidebar';

require('styles/style.scss');

class Main extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Sidebar />
          <Container className={'mainContainer'} fluid={true}>

            <Row>
              <Col className={'px-0'}>
                <TopBar />
              </Col>
            </Row>

            <Row className={'content'}>
              <Col className={'px-4 pt-3 pb-4'}>
                <Switch>
                  <PrivateRoute exact path='/' component={Cocpit} />
                  <PrivateRoute path='/addPage' component={AddPage} />
                  <PrivateRoute path='/siteStats/:id' component={SiteStats} />
                  <PrivateRoute path='/reports' component={Reports} />

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
