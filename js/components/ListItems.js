import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { CookiesProvider } from 'react-cookie';

import ListItemsTemplate from './ListItemsTemplate';
import ListItem from './ListItem';

export default class ListItems extends Component {
  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
  }


  renderList() {

    let selectedListId = this.props.selectedListId;

    let matchedList = this.props.listOfLists.filter(function( obj ) {
      return obj.id === selectedListId;
    });

    let theList = matchedList.length === 0 ? this.props.listOfLists[0].list : matchedList[0].list;

    return (
      theList.map((item, i) =>
        <CookiesProvider key={`key_${item.id}`} >
          <ListItem
            index={i}
            item={item}
            listOfLists={this.props.listOfLists}
            isAdmin={this.props.isAdmin}
            selectedListId={this.props.selectedListId}
            removeListItem={this.props.removeListItem}
            increaseVote={this.props.increaseVote}
            decreaseVote={this.props.decreaseVote} />
        </CookiesProvider>
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
