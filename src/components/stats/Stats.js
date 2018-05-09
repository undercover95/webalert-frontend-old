import React from 'react';

import StatsTitle from './StatsTitle';

export default class Stats extends React.Component {

    render() {
        return (
            <div>
                <StatsTitle title='Statystyki witryny' sitename='example.com' />
                
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-sm-4">
                                <div className="statsOverview mb-3" id="averageResponseTimeIndicator">
                                    <span className="badge badge-info">2.343 s</span><br/>
                                    Średni czas odpowiedzi serwera
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="statsOverview mb-3" id="workFromIndicator">
                                    <span className="badge badge-success">2d 5h 34min</span><br/>
                                    Działa bez awarii
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="statsOverview mb-3" id="notWorkFromIndicator">
                                    <span className="badge badge-danger">Nie dotyczy</span><br/>
                                    Nie działa od
                                </div>
                            </div>
                        </div>

                        <div id="select-period-wrapper">
                            <div className="form-group row">
                                <label for="exampleSelect2" className="col-sm-4">Pokaż dane z: </label>
                                <div className="col-sm-8">
                                    <select className="form-control form-control-sm mb-3" id="exampleSelect2">
                                        <option>ostatnich 6 godzin</option>
                                        <option>ostatnich 12 godzin</option>
                                        <option>ostatnich 24 godzin</option>
                                        <option>ostatnich 48 godzin</option>
                                        <option>ostatniego tygodnia</option>
                                        <option>ostatniego miesiąca</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <h4><i className="fa fa-check-circle-o" aria-hidden="true"></i> Dostępność strony</h4>
                        <div id="page-service-status" className="my-3"></div>
                        <hr/>
                        <h4><i className="fa fa-clock-o" aria-hidden="true"></i> Czas odpowiedzi serwera</h4>
                        <canvas id="responseTimeChart" width="700" height="250"></canvas>
                    </div>
                </div>
            </div>
        )
    }
}