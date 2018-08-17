import React from 'react';

import StatusTableRowItem_statusToolTip from './StatusTableRowItem_statusToolTip';

const StatusTableRowItem_statusCode = (props) => {

  const status_code = props.status_code;
  const short_desc = props.short_desc;
  const long_desc = props.long_desc;

  let code = status_code;
  let badgeClass = 'badge-light';
  let content = '';

  if (code >= 100 && code < 200) {
    // informations
    badgeClass = 'badge-primary';
  } else if (code >= 200 && code < 300) {
    // successes
    badgeClass = 'badge-success';
  } else if (code >= 300 && code < 400) {
    // redirections
    badgeClass = 'badge-info';
  } else if (code >= 400 && code < 500) {
    // client errors
    badgeClass = 'badge-warning';
  } else if ((code >= 500 && code < 600) || (code == -1 || code == -2)) {
    // server errors + DNS errors + unknown errors
    badgeClass = 'badge-danger';
  }

  content = (
    <span>
      <span className={'badge ' + badgeClass}>
        {(code == null || code == undefined || code == -1 || code == -2 ? '-' : code)}
      </span>&nbsp;
      {
        <span className='status-code-description'>
          <small>
            {short_desc == null ? '' : short_desc}
          </small>
        </span>
      }


      <span>
        {
          // popover help
          (code == null || code == undefined || short_desc == null || long_desc == null) ? '' : (
            <StatusTableRowItem_statusToolTip id={props.site_id}
              title={code == -1 || code == -2 ? short_desc : (code + ' - ' + short_desc)}
              content={long_desc} />
          )
        }
      </span>

    </span>
  )

  return (
    <td>
      {content}
    </td>
  );
}

StatusTableRowItem_statusCode.propTypes = {
  errors: React.PropTypes.array,
  addedSitesCount: React.PropTypes.number
}

export default StatusTableRowItem_statusCode;