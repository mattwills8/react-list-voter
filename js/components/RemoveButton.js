import React, { Component } from 'react';

//expects to be passed as props:
//btnContent - button content to show first
//onClick - callback function to call on click
//onClickArgs - array of args to pass to onClick
export default class RemoveButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      removeButtonStatus: 'notClicked'
    };

    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
  }

  handleRemoveButtonClick() {
    if(this.state.removeButtonStatus === 'clicked') {
      this.props.onClick(...this.props.onClickArgs);
      this.setState( { removeButtonStatus: 'notClicked' } );
    } else {
      this.setState( { removeButtonStatus: 'clicked' } );
    }
  }

  render() {

    let button = {
      clicked: {
        class: 'btn-warning',
        content: 'Sure?'
      },
      notClicked: {
        class: 'btn-danger',
        content: this.props.btnContent
      }
    }
    let buttonState = this.state.removeButtonStatus === 'clicked' ? button.clicked : button.notClicked;

    return (
      <button
        className={"btn "+buttonState.class}
        onClick={this.handleRemoveButtonClick}
        >{buttonState.content}
      </button>
    );
  }
}
