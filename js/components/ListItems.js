import React, { Component } from 'react';

export default class ListItems extends Component {

  render(){

    var listItems = this.props.theList.map((item, i) =>
      <li
        key={"key_"+(i+1)}
        className="row list-item"
      >
        <div className="col-1 vote-button vote-up">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
        <div className="col-1 votes-wrapper">
          {item.votes}
        </div>
        <div className="col-9">
          {item.value}
        </div>
        <div className="col-1 vote-button vote-down">
          <i class="fa fa-arrow-down" aria-hidden="true"></i>
        </div>

      </li>
    );

    return listItems;
  }
}
