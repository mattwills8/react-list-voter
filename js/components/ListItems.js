import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

import ListItemsTemplate from './ListItemsTemplate';
import ListItem from './ListItem';

export default class ListItems extends Component {
  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
  }


  renderList() {
    let selectedListId =this.props.selectedListId;
    let theList = this.props.listOfLists.filter(function( obj ) {
      return obj.id === selectedListId;
    })[0].list;

    return (
      theList.map((item, i) =>
        <ListItem
          key={`key_${item.id}`}
          index={i}
          item={item}
          listOfLists={this.props.listOfLists}
          selectedListId={this.props.selectedListId}
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
