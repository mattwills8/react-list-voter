import React, { Component } from 'react';

export default class ListItems extends Component {
  constructor(props) {
    super(props);

    this.increaseVote = this.increaseVote.bind(this);
  }

  increaseVote(id) {
    this.props.increaseVote(this.props.theList, id);
  }

  render(){

    //TODO: turn vote buttons into sub components
    var listItems = this.props.theList.map((item, i) =>
      <li
        key={"key_"+(i+1)}
        className="row list-item">
        <div
          className="col-1 vote-button vote-up"
          onClick={() => {this.increaseVote(item.id)}}>
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
        <div className="col-1 votes-wrapper">
          {item.votes}
        </div>
        <div className="col-9">
          {item.value} id: {item.id}
        </div>
        <div className="col-1 vote-button vote-down">
          <i className="fa fa-arrow-down" aria-hidden="true"></i>
        </div>

      </li>
    );

    return listItems;
  }
}
