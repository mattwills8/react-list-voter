//core
import React, { Component } from 'react';

export default class ListItem extends Component {

  constructor(props) {
    super(props);

    this.removeListItem = this.removeListItem.bind(this);
    this.increaseVote = this.increaseVote.bind(this);
    this.decreaseVote = this.decreaseVote.bind(this);
  }

  removeListItem() {
    this.props.removeListItem(this.props.theList, this.props.item.id);
  }

  increaseVote() {
    this.props.increaseVote(this.props.theList, this.props.item.id);
  }

  decreaseVote() {
    this.props.decreaseVote(this.props.theList, this.props.item.id);
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
          <button
            className="btn btn-danger"
            onClick={() => {this.removeListItem()}}
            >Remove
          </button>
        </div>
      </div>
    );

  };
}
