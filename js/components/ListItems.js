import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

import ListItemsTemplate from './ListItemsTemplate';
import ListItem from './ListItem';

export default class ListItems extends Component {

  renderList() {
    return (
      this.props.theList.map((item, i) =>
        <ListItem
          theList={this.props.theList}
          key={`key_${item.id}`}
          index={i}
          item={item}
          removeListItem={this.props.removeListItem}
          increaseVote={this.props.increaseVote}
          decreaseVote={this.props.decreaseVote} />
      )
    );
  }

  render(){

    return (
      <ListItemsTemplate>
          {this.renderList()}
      </ListItemsTemplate>
    );
  }
}
