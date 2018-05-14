import React from 'react';

export default class SiteStatsTitle extends React.Component {
  render() {
    return (
      <h2 className='mt-2 mb-4'><i className={'fa '+this.props.icon} aria-hidden='true'></i> {this.props.title} <small style={{'color': '#73808c', 'fontStyle': 'italic'}}>{this.props.sitename}</small></h2>
    );
  }
}