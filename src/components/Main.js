import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

import Cocpit from './cocpit/Cocpit';
import AddPage from './addPage/AddPage';
import SiteStats from './siteStats/SiteStats';
import Reports from './reports/Reports';

require('styles/style.scss');

class Main extends React.Component {
  render() {
    return (
      <Router>
      <div className='container'>
        <TopBar />
        <div className='row'>
          <div className='col mb-4'>
            <Switch>
              <Route exact path='/' component={Cocpit} />
              <Route path='/addPage' component={AddPage} />
              <Route path='/siteStats/:url' component={SiteStats} />
              <Route path='/reports' component={Reports} />
              <Route component={Cocpit} />
            </Switch>
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default Main;
