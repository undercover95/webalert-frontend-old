import React from 'react';

import {Line} from 'react-chartjs-2';

export default class TimeResponseChart extends React.Component {

    render() {

        const dataSet = this.props.data;

        const data = {
            labels: dataSet.x,
            datasets: [
              {
                label: 'Czas odpowiedzi serwera [s]',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                width:'400',
                height:'300',
                data: dataSet.y
              }
            ]
        };

        return (
            <div>
               <Line data={data} />
            </div>
        )
    }
}