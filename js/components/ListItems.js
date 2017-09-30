import React, { Component } from 'react';

export default class ListItems extends Component {

  render(){

    var listItems = this.props.myList.map((item, i) =>
      <li
        key={"key_"+(i+1)}
        className="list-item"
      >
        {item.value}
      </li>
    );

    return listItems;
  }
}
