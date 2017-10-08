import React, { Component } from 'react';

export default class AddListForm extends Component {
  constructor(props) {
    super(props);

    this.state = { term: {
                     name: ''
                   }
                 };

    this.addList = this.addList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  addList(valueToAdd) {
    this.props.addList(this.props.listOfLists, valueToAdd);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleInputChange(event) {
    this.setState( { term: {
                        name: event.target.value,
                      }
                    });
  }

  handleButtonClick() {
    this.addList(this.state.term);
    this.setState( { term: {
                      name: '',
                     }
                   } );
  }

  render(){

    return (
      <form
        className="input-group add-list-item-form"
        onSubmit={this.handleSubmit}>
        <input
          placeholder="List Name"
          className="form-control add-list-item-value"
          value={this.state.term.name}
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
