import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

export default class ListItemsTemplate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      enterLeaveAnimation: 'accordianVertical'
    };
  }

  render(){

    return (
      <FlipMove
        staggerDurationBy="30"
        duration={500}
        enterAnimation={this.state.enterLeaveAnimation}
        leaveAnimation={this.state.enterLeaveAnimation}
        typeName="ul"
        className="container list-wrapper">
          {this.props.children}
      </FlipMove>
    );
  }
}
