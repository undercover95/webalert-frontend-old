import React from 'react';

class Title extends React.Component {
  render() {
    return (
      <h2 className='page-title my-4'><i className={'fa ' + this.props.icon} aria-hidden='true'></i> {this.props.title}</h2>
    );
  }
}

export default Title;