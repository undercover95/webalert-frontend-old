import React from 'react';

import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import * as Actions from 'actions/Actions';

export default class ReportView extends React.Component {

  constructor() {
    super();
    this.state = {
      isShowingModal: false
    }
  }

  handleClick = () => {
    this.setState({
      isShowingModal: true
    });
    Actions.receiveReport(this.props.report_id);
  }

  handleClose = () => this.setState({isShowingModal: false})

  render() {
    return (
    <div>
      <button className='btn btn-sm btn-primary' onClick={this.handleClick}>Zobacz raport</button>
      <div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h3>{this.props.title}</h3>
              {this.props.content}
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    </div>
    )
  }
}
