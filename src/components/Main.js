import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

import Cocpit from './cocpit/Cocpit';
import AddPage from './addPage/AddPage';
import Stats from './stats/Stats';

require('styles/style.scss');

class Main extends React.Component {
  render() {
    return (
      <Router>
      <div className='container-fluid px-0'>
        <TopBar />
        <div className='row mx-0'>
          <div className='col-lg-2 px-0'>
            <Sidebar />
          </div>
          <div className='col-lg-10 mb-4 pl-4'>
            <Route exact path="/" component={Cocpit} />
            <Route path="/addPage" component={AddPage} />
            <Route path="/stats" component={Stats} />
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default Main;
