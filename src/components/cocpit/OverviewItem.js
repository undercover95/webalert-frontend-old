import React from 'react';

class OverviewItem extends React.Component {

    constructor(){
        super();
        this.state = {
            counter: 0
        }
    }

    render() {
        const description = this.props.description;
        const icon = this.props.icon;
        return (
            <div id={this.props.type} className='card overview-content mb-3'>
                <div className='card-body'>
                    <i className={'fa fa-2x '+icon} aria-hidden='true'></i>
                    <span className='badge overview-counter'>{this.state.counter}</span><br/>
                    <small>{description}</small>
                </div>
            </div>
        );
    }
  }
  
export default OverviewItem;