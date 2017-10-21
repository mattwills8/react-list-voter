//core
import React, { Component } from 'react';

export default class ListItemContent extends Component {
  constructor(props) {
    super(props);

    this.renderPostAdminMeta = this.renderPostAdminMeta.bind(this);
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

    return(
      <div
        className={`${this.props.mainWidth} ${this.props.visisbility} list-item-content`} >
        {this.renderPostAdminMeta()}
        <div
          className="row">
          <div
            dangerouslySetInnerHTML={{__html: this.props.item.values.postContent.content.rendered}} >
          </div>
        </div>
      </div>
    );
  }
}
