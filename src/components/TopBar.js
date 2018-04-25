import React from 'react';

class TopBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/monitor_stron"><i className="fa fa-globe" aria-hidden="true"></i> Monitor stron internetowych</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <span className="navbar-text">Zalogowano jako</span>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle" aria-hidden="true"></i> User</a>
                        
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/monitor_stron/settings.php">Ustawienia</a>
                                <a className="dropdown-item" href="/monitor_stron/engine/controller.php?action=logout"><i className="fa fa-sign-out" aria-hidden="true"></i> Wyloguj</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
  
export default TopBar;