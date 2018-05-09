import React from 'react';

class StatsTitle extends React.Component {
    render() {
      return (
        <h2 className="mt-2">{this.props.title} <small>{this.props.sitename}</small></h2>
      );
    }
  }
  
export default StatsTitle;