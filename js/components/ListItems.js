import React, { Component } from 'react';

import ListItem from './ListItem';

export default class ListItems extends Component {

  render(){

    var listItems = this.props.theList.map((item, i) =>
      <ListItem
        theList={this.props.theList}
        key={"key_"+(i+1)}
        item={item}
        i={i}
        increaseVote={this.props.increaseVote} />
    );

    return listItems;
  }
}
