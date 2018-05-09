import React from 'react';

class Title extends React.Component {
    render() {
      return (
        <h2 className="mt-2">{this.props.title}</h2>
      );
    }
  }
  
export default Title;