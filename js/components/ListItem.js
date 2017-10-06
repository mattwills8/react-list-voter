//core
import React, { Component } from 'react';

export default class ListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      removeButtonStatus: 'notClicked'
    };

    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.increaseVote = this.increaseVote.bind(this);
    this.decreaseVote = this.decreaseVote.bind(this);
  }

  handleRemoveButtonClick() {
    if(this.state.removeButtonStatus === 'clicked') {
      this.props.removeListItem(this.props.theList, this.props.item.id);
      this.setState( { removeButtonStatus: 'notClicked' } );
    } else {
      this.setState( { removeButtonStatus: 'clicked' } );
    }
  }

  increaseVote() {
    this.props.increaseVote(this.props.theList, this.props.item.id);
  }

  decreaseVote() {
    this.props.decreaseVote(this.props.theList, this.props.item.id);
  }

  renderRemoveButton() {

    let button = {
      clicked: {
        class: 'btn-warning',
        content: 'Sure?'
      },
      notClicked: {
        class: 'btn-danger',
        content: 'Remove'
      }
    }
    let buttonState = this.state.removeButtonStatus === 'clicked' ? button.clicked : button.notClicked;

    return (
      <button
        className={"btn "+buttonState.class}
        onClick={() => {this.handleRemoveButtonClick()}}
        >{buttonState.content}
      </button>
    );
  }

  render() {

    return (

      <div className="row">
        <li
          className="col-10 list-item">
          <div
            className="row">
            <div
              className="col-1 vote-button vote-up"
              onClick={() => {this.increaseVote()}}>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </div>
            <div className="col-1 votes-wrapper">
              {this.props.item.votes}
            </div>
            <div className="col-9">
              {this.props.item.value}
            </div>
            <div
                className="col-1 vote-button vote-down"
                onClick={() => {this.decreaseVote()}}>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
            </div>
          </div>
        </li>
        <div
          className="col-2">
          {this.renderRemoveButton()}
        </div>
      </div>
    );

  };
}
