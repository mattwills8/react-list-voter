import React, { Component } from 'react';

import BulkAddListItemsForm from './BulkAddListItemsForm';

export default class AddListItemButton extends Component {
  constructor(props) {
    super(props);

    this.state = { term: {} };

    this.addItem = this.addItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  addItem(valueToAdd) {
    this.props.addListItem(this.props.listOfLists, this.props.selectedListId, valueToAdd);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleInputChange(event) {
      let term = this.state.term;
      let name = event.target.name;
      let value = event.target.value;

      term[name] = value;

      this.setState({term})
  }

  handleButtonClick() {
    this.addItem(this.state.term);
    this.setState( { term: {} } );
  }

  render(){

    return (
      <div>
        <form
          className="input-group add-list-item-form"
          onSubmit={this.handleSubmit}>
          <input
            placeholder="Post ID"
            className="form-control add-list-item-value"
            name="postID"
            value={this.state.term.postID || ''}
            onChange={this.handleInputChange} />
          <button
            className="add-list-item-button"
            onClick={this.handleButtonClick} >
            +
          </button>
        </form>
        <BulkAddListItemsForm
          listOfLists={this.props.listOfLists}
          selectedListId={this.props.selectedListId}
          bulkAddListItems={this.props.bulkAddListItems}
           />
      </div>
    );
  }
}
