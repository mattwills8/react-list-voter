import React, { Component } from 'react';

import BulkAddListItemsForm from './BulkAddListItemsForm';

export default class AddListItemButton extends Component {
  constructor(props) {
    super(props);

    this.state = { term: {
                     name: '',
                     image_url: ''
                   }
                 };

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
    this.setState( { term: {
                        name: event.target.value,
                        image_url: ''
                      }
                    });
  }

  handleButtonClick() {
    this.addItem(this.state.term);
    this.setState( { term: {
                      name: '',
                      image_url: ''
                     }
                   } );
  }

  render(){

    return (
      <div>
        <form
          className="input-group add-list-item-form"
          onSubmit={this.handleSubmit}>
          <input
            placeholder="Item Name"
            className="form-control add-list-item-value"
            value={this.state.term.name}
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
