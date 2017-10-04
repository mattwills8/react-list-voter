//core
import React, { Component } from 'react';

export default class ListItem extends Component {

  constructor(props) {
    super(props);

    this.increaseVote = this.increaseVote.bind(this);
  }

  increaseVote() {
    this.props.increaseVote(this.props.theList, this.props.i);
  }

  render() {

    return (
      <li
        className="row list-item">
        <div
          className="col-1 vote-button vote-up"
          onClick={() => {this.increaseVote()}}>
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
        <div className="col-1 votes-wrapper">
          {this.props.item.votes}
        </div>
        <div className="col-9">
          {this.props.item.value} id: {this.props.item.id}
        </div>
        <div className="col-1 vote-button vote-down">
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
        </div>
      </li>
    );

  };
}
