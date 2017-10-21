//core
import React, { Component } from 'react';

import RemoveButton from './RemoveButton';
import ListItemContent from './ListItemContent';

export default class ListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      removeButtonStatus: 'notClicked',
      postContentStatus: 'hidden',
    };

    this.increaseVote = this.increaseVote.bind(this);
    this.decreaseVote = this.decreaseVote.bind(this);
    this.showHideListItemContent = this.showHideListItemContent.bind(this);
    this.renderRemoveButton = this.renderRemoveButton.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
  }

  increaseVote() {
    this.props.increaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
  }

  decreaseVote() {
    this.props.decreaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
  }

  showHideListItemContent() {
    if(this.state.postContentStatus === 'hidden') {
      this.setState( {
        removeButtonStatus: this.state.removeButtonStatus,
        postContentStatus: 'visible',
       } );
       return;
    }
    this.setState( {
      removeButtonStatus: this.state.removeButtonStatus,
      postContentStatus: 'hidden',
     } );
  }

  renderRemoveButton() {
    if(this.props.isAdmin){
      return (
        <div
          className="col-2">
          <RemoveButton
            btnContent="X"
            onClick={this.props.removeListItem}
            onClickArgs={[this.props.listOfLists, this.props.selectedListId, this.props.item.id]}/>
        </div>
      );
    }
  }

  renderMedia() {

    return (
      <img src={this.props.item.values.postMedia.postImage.src} />
    );
  }

  render() {

    var mainWidth = this.props.isAdmin ? 'col-10' : 'col-12';

    return (

      <div className="row">
        <li
          className={`${mainWidth} list-item`}
          onClick={() => {this.showHideListItemContent()}}>
          <div
            className="row">
            <div
              className="col-1 vote-button vote-up"
              onClick={() => {this.increaseVote()}}>
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </div>
            <div className="col-1 votes-wrapper">
              {this.props.item.votes}
            </div>
            <div className="col-7">
              {this.props.item.values.postContent.title.rendered}
            </div>
            <div className="col-2 list-featured-image">
              {this.renderMedia()}
            </div>
            <div
                className="col-1 vote-button vote-down"
                onClick={() => {this.decreaseVote()}}>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
            </div>
          </div>
        </li>
        {this.renderRemoveButton()}
        <ListItemContent
          visisbility={this.state.postContentStatus}
          mainWidth={mainWidth}
          item={this.props.item}
          isAdmin={this.props.isAdmin} />
      </div>
    );

  };
}
