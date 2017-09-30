import React, { Component } from 'react';

export default class ListItems extends Component {

  render(){

    var listItems = this.props.myList.map((item, i) =>
      <li
        key={"key_"+i}
        className="list-item"
      >
        {item}
      </li>
    );

    return listItems;
  }
}
