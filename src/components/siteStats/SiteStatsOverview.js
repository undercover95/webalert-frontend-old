import React from 'react';

export default class SiteStatsOverview extends React.Component {

    getAverageResponseTime() {
        const data = this.props.data;

        let sum = 0.0;
        data.map(row => {
            sum = +sum + +row['last_response_time']
        });

        return (sum / data.length).toFixed(2);
    }

    getMinMaxResponseTime() {

      let currentMin = 99999999999;
      let currentMax = 0;

      this.props.data.map(row => {
        let currentVal = row['last_response_time']

        if(currentVal > currentMax) currentMax = currentVal
        else if(currentVal < currentMin) currentMin = currentVal
      });

      return {
        'max': currentMax,
        'min': currentMin
      }
    }

    render() {
      const minmaxTime = this.getMinMaxResponseTime()
      const avgTime = this.getAverageResponseTime()
      return (
        <div>
          <table className={'table table-hover'} id={'overview-table'}>
            <tbody style={{'textAlign':'center'}}>
              <tr className={'overview-header'}>
                <td colSpan={2}><i className='fa fa-clock-o' aria-hidden='true'></i>  Czas odpowiedzi serwera</td>
              </tr>
              <tr className={'overview-response-time'}>
                <td>Najkrótszy</td>
                <td>{minmaxTime.min} s</td>
              </tr>
              <tr className={'overview-response-time'}>
                <td>Najdłuższy</td>
                <td>{minmaxTime.max} s</td>
              </tr>
              <tr className={'overview-response-time'}>
                <td>Średni</td>
                <td>{avgTime} s</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
}
