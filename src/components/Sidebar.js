import React from 'react';

import {
    NavLink as Link
  } from 'react-router-dom';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar bg-dark">
                <div className="list-group">
                    <Link exact to="/" activeClassName="active" className="list-group-item list-group-item-action">
                        <i className="fa fa-home" aria-hidden="true"></i> Kokpit
                    </Link>
                    <Link to="/addPage" activeClassName="active" className="list-group-item list-group-item-action">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i> Dodaj witrynę
                    </Link>
                    <Link to="#" activeClassName="active" className="list-group-item list-group-item-action">
                        <i className="fa fa-bullhorn" aria-hidden="true"></i> Raporty <span className="badge badge-danger">5</span>
                    </Link>
                    <Link to="/stats" activeClassName="active" className="list-group-item list-group-item-action">
                        <i className="fa fa-pie-chart" aria-hidden="true"></i> Statystyki
                    </Link>
                </div>
            </div>
        );
    }
  }
  
export default Sidebar;