import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class StatusTableRowItem_statusToolTip extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {

    const title = this.props.title;
    const content = this.props.content;
    const id = this.props.id;

    return (
      <span>
        <span className='statusToolTip' id={'popover-' + id} onMouseOver={this.toggle} onMouseOut={this.toggle}>
          <i className='fa fa-question-circle' aria-hidden='true'></i>
        </span>
        <Popover placement='right' isOpen={this.state.popoverOpen} target={'popover-' + id} toggle={this.toggle}>
          <PopoverHeader>{title}</PopoverHeader>
          <PopoverBody>{content}</PopoverBody>
        </Popover>
      </span>
    );
  }
}