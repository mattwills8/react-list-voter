import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

import ListItem from './ListItem';

export default class ListItems extends Component {

  constructor(props) {
    super(props);

    this.state = {
      enterLeaveAnimation: 'accordianVertical'
    };
  }

  renderList() {
    return (
      this.props.theList.map((item, i) =>
        <ListItem
          theList={this.props.theList}
          key={`key_${item.id}`}
          index={i}
          item={item}
          increaseVote={this.props.increaseVote}
          decreaseVote={this.props.decreaseVote} />
      )
    );
  }

  render(){

    return (
      <FlipMove
        staggerDurationBy="30"
        duration={500}
        enterAnimation={this.state.enterLeaveAnimation}
        leaveAnimation={this.state.enterLeaveAnimation}
        typeName="ul">
          {this.renderList()}
      </FlipMove>
    );
  }
}
