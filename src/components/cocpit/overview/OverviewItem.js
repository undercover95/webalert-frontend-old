import React from 'react';

const OverviewItem = (props) => {

    const type = props.type;
    const description = props.description;
    const icon = props.icon;
    const counter = props.counter;

    return (
        <div id={type} className={'card overview-content mb-3'}>
            <div className='card-body'>
                <i className={'fa fa-2x ' + icon} aria-hidden='true'></i>
                <div className='overview-counter'>{counter}</div>
                <p>{description}</p>
            </div>
        </div>
    );
}

OverviewItem.propTypes = {
    type: React.PropTypes.string,
    description: React.PropTypes.string,
    icon: React.PropTypes.string,
    counter: React.PropTypes.number
}

export default OverviewItem;
