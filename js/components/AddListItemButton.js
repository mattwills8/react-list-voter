import React, { Component } from 'react';

export default class AddListItemButton extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    this.props.onClick(this.props.theList);
  }

  render(){

    return (
      <button onClick={this.addItem}>
        +
      </button>
    );
  }
}
