import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar bg-dark">
                <div className="list-group">
                    <a href="/monitor_stron" className="list-group-item list-group-item-action">
                        <i className="fa fa-home" aria-hidden="true"></i> Kokpit
                    </a>
                    <a href="#" className="list-group-item list-group-item-action active">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i> Dodaj witrynę
                    </a>
                    <a href="http://dnscheck.pingdom.com/" target="_blank" className="list-group-item list-group-item-action">
                        <i className="fa fa-cogs" aria-hidden="true"></i> Testuj witrynę<br/><small>(DNS Checker)</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                        <i className="fa fa-wrench" aria-hidden="true"></i> Ustawienia
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                        <i className="fa fa-bullhorn" aria-hidden="true"></i> Raporty <span className="badge badge-danger">5</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                        <i className="fa fa-pie-chart" aria-hidden="true"></i> Statystyki
                    </a>
                </div>
            </div>
        );
    }
  }
  
export default Sidebar;