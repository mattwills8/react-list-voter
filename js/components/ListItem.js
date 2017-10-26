//core
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import RemoveButton from './RemoveButton';
import ListItemContent from './ListItemContent';

class ListItem extends Component {

  constructor(props) {
    super(props);

    this.cookies = new Cookies;
    this.cookieName = this.props.item.values.postID;

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

    // ignore cookies in admin area
    if(this.props.isAdmin) {
      this.props.increaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
      return;
    }

    // only increase vote if they haven't already voted
    if( ! this.cookies.get(this.cookieName) ) {

      this.cookies.set(this.cookieName, true);

      this.props.increaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);

      return;
    }

    alert('Oops! You already voted for this item!');
  }

  decreaseVote() {

    // ignore cookies in admin area
    if(this.props.isAdmin) {
      this.props.decreaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);
      return;
    }

    // only decrease vote if they haven't already voted
    if( ! this.cookies.get(this.cookieName) ) {

      this.cookies.set(this.cookieName, true);

      this.props.decreaseVote(this.props.listOfLists, this.props.selectedListId, this.props.item.id);

      return;
    }

    alert('Oops! You already voted for this item!');
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
          className="col-2 my-auto">
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
          className={`${mainWidth} list-item`} >
          <div
            className="row">
            <div className="col-lg-2 my-auto votes-wrapper">
              <span className="vote">
                {this.props.item.votes}
              </span>
            </div>
            <div
              className="col-lg-1 my-auto vote-button vote-up"
              onClick={() => {this.increaseVote()}}>
              <div
                className="circle">
                <i className="fa fa-arrow-up align-middle" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-lg-2 my-auto list-featured-image">
              {this.renderMedia()}
            </div>
            <div
              className="col-lg-6 my-auto" >
              <div className="row my-auto list-item-title">
                <span>{this.props.item.values.postContent.title.rendered}</span>
              </div>
              <div className="row my-auto list-item-read-more">
                <button
                  className="btn"
                  onClick={() => {this.showHideListItemContent()}} >
                  Read More
                </button>
              </div>
            </div>
            <div
              className="col-lg-1 my-auto vote-button vote-down"
              onClick={() => {this.decreaseVote()}}>
              <div
                className="circle">
                <i className="fa fa-arrow-down" aria-hidden="true"></i>
              </div>
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

export default withCookies(ListItem);
