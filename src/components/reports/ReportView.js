import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ReportView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    
      render() {

        const title = this.props.title;
        const content = this.props.content;

        return (
          <div>
            <Button color="danger" onClick={this.toggle}>Zobacz raport</Button>
            <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
              <ModalBody>
                {content}
              </ModalBody>
              <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
}
  