import React from 'react';

class OverviewItem extends React.Component {

    render() {
        const description = this.props.description;
        const icon = this.props.icon;
        const counter = this.props.counter;

        return (
            <div id={this.props.type} className='card overview-content mb-3'>
                <div className='card-body'>
                    <i className={'fa fa-2x '+icon} aria-hidden='true'></i>
                    <span className='badge overview-counter'>{counter}</span><br/>
                    <small>{description}</small>
                </div>
            </div>
        );
    }
  }
  
export default OverviewItem;