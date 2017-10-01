import React, { Component } from 'react';

export default class ListItems extends Component {

  render(){

    var listItems = this.props.theList.map((item, i) =>
      <li
        key={"key_"+(i+1)}
        className="row list-item"
      >
        <div className="col-1 vote-buttons-wrapper">
          <div className="vote-button vote-up">

          </div>
          <div className="vote-button vote-down">

          </div>
        </div>
        <div className="col-1 votes-wrapper">
          {item.votes}
        </div>
        <div className="col-10">
          {item.value}
        </div>

      </li>
    );

    return listItems;
  }
}
