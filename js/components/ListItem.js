//core
import React, { Component } from 'react';

import RemoveButton from './RemoveButton';

export default class ListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      removeButtonStatus: 'notClicked'
    };

    this.increaseVote = this.increaseVote.bind(this);
    this.decreaseVote = this.decreaseVote.bind(this);
    this.renderRemoveButton = this.renderRemoveButton.bind(this);
    this.renderPostAdminMeta =this.renderPostAdminMeta.bind(this);
  }

  increaseVote() {
    this.props.increaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
  }

  decreaseVote() {
    this.props.decreaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
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

  renderPostAdminMeta() {
    if(this.props.isAdmin){
      return (
        <div
          className="row">
          <div
            className="col-6">
            <h5>Post ID:</h5>
          </div>
          <div
            className="col-6">
            <h6>{this.props.item.values.postID}</h6>
          </div>
        </div>
      );
    }
  }

  render() {

    var mainWidth = this.props.isAdmin ? 'col-10' : 'col-12';

    return (

      <div className="row">
        <li
          className={`${mainWidth} list-item`}>
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
              <img src={this.props.item.values.postMedia.postImage.src} />
            </div>
            <div
                className="col-1 vote-button vote-down"
                onClick={() => {this.decreaseVote()}}>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
            </div>
          </div>
        </li>
        {this.renderRemoveButton()}
        <div
          className={mainWidth}>
          {this.renderPostAdminMeta()}
          <div
            className="row">
            <div
              dangerouslySetInnerHTML={{__html: this.props.item.values.postContent.content.rendered}} >
            </div>
          </div>
        </div>
      </div>
    );

  };
}
