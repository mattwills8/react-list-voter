import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

import ListItem from './ListItem';

export default class ListItems extends Component {

  render(){

    var listItems = this.props.theList.map((item, i) =>
      <ListItem
        theList={this.props.theList}
        key={"key_"+(i+1)}
        item={item}
        increaseVote={this.props.increaseVote}
        decreaseVote={this.props.decreaseVote} />
    );

    return (
      <FlipMove>
        {listItems}
      </FlipMove>
    );
  }
}
