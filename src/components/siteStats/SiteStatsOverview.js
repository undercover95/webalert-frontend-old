import React from 'react';

const SiteStatsOverview = (props) => {

  let getAverageResponseTime = () => {
    const data = props.data;

    let sum = 0.0;
    data.map(row => {
      sum = +sum + +row['last_response_time']
    });

    return (sum / data.length).toFixed(2);
  }

  let getMinMaxResponseTime = () => {

    let currentMin = 99999999999;
    let currentMax = 0;

    props.data.map(row => {
      let currentVal = row['last_response_time']
      if (currentVal === null || currentVal === undefined) return;
      else if (currentVal > currentMax) currentMax = currentVal
      else if (currentVal < currentMin) currentMin = currentVal
    });

    return {
      'max': currentMax,
      'min': currentMin
    }
  }

  const minmaxTime = getMinMaxResponseTime()
  const avgTime = getAverageResponseTime()

  return (
    <div>
      <table className={'table table-hover'} id={'overview-table'}>
        <tbody style={{ 'textAlign': 'center' }}>
          <tr className={'overview-header'}>
            <td colSpan={2}><i className='fa fa-clock-o' aria-hidden='true'></i>  Czas odpowiedzi serwera</td>
          </tr>
          <tr className={'overview-response-time'}>
            <td>Najkrótszy</td>
            <td>{minmaxTime.min}&nbsp;s</td>
          </tr>
          <tr className={'overview-response-time'}>
            <td>Najdłuższy</td>
            <td>{minmaxTime.max}&nbsp;s</td>
          </tr>
          <tr className={'overview-response-time font-italic font-weight-bold'}>
            <td>Średni</td>
            <td>{avgTime}&nbsp;s</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SiteStatsOverview;