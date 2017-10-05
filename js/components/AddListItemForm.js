import React, { Component } from 'react';

export default class AddListItemButton extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.addItem = this.addItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  addItem(valueToAdd) {
    this.props.onClick(this.props.theList,valueToAdd);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleInputChange(event) {
    this.setState( { term: event.target.value } );
  }

  handleButtonClick() {
    this.addItem(this.state.term);
    this.setState( { term: '' } );
  }

  render(){

    return (
      <form
        className="input-group add-list-item-form"
        onSubmit={this.handleSubmit}>
        <input
          placeholder="Item Name"
          className="form-control add-list-item-value"
          value={this.state.term}
          onChange={this.handleInputChange} />
        <button
          className="add-list-item-button"
          onClick={this.handleButtonClick} >
          +
        </button>
      </form>
    );
  }
}
