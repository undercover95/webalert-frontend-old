import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';

import Title from './Title';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

import Overview from './cocpit/Overview';
import StatusTable from './cocpit/StatusTable';

require('styles/style.scss');

class Main extends React.Component {
  render() {
    return (
      <div className='container-fluid'>
        <TopBar />
        <div className='row'>
          <div className='col-md-2'>
            <Sidebar />
          </div>
          <div className='col-md-10'>
            <Title title='Kokpit' />
            <Overview />
            <h3>Aktualny stan witryn</h3>
            <StatusTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
