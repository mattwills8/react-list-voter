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
  }

  increaseVote() {
    this.props.increaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
  }

  decreaseVote() {
    this.props.decreaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
  }

  render() {

    return (

      <div className="row">
        <li
          className="col-10 list-item">
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
        <div
          className="col-2">
          <RemoveButton
            btnContent="Remove"
            onClick={this.props.removeListItem}
            onClickArgs={[this.props.listOfLists, this.props.selectedListId, this.props.item.id]}/>
        </div>
        <div
          className="col-10">
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
