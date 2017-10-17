//core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//action creators

import {
  init,
  bulkAddListItems,
  addListItem,
  removeListItem,
  increaseVote,
  decreaseVote
} from '../actions';

//components
import ListItems from '../components/ListItems';
import AddListItemForm from '../components/AddListItemForm';
import ListMeta from '../components/ListMeta';

//helpers
import { getListObjectBySelectedListId } from '../helpers/functions_list';


class List extends Component {
  constructor(props){
    super(props);

    //get initial state
    this.props.init();

    this.renderAddListItemForm = this.renderAddListItemForm.bind(this);
  }

  renderAddListItemForm() {

    if(this.props.isAdmin){
      return (
        <AddListItemForm
          listOfLists={this.props.listOfLists}
          selectedListId={this.props.selectedListId}
          bulkAddListItems={this.props.bulkAddListItems}
          addListItem={this.props.addListItem}
        />
      );
    }
  }


  render() {

    if(this.props.listOfLists.filter( list => {return list.id === this.props.selectedListId}).length === 0){
      return (
        <h1>Select List To Edit</h1>
      );
    }

    var currentListName = getListObjectBySelectedListId(this.props.listOfLists, this.props.selectedListId).name;

    return (
      <div>
        {this.renderAddListItemForm()}
        <div
          className="row">
          <h2 className="col-12 text-center">
            {currentListName}
          </h2>
        </div>
        <ListItems
          listOfLists={this.props.listOfLists}
          isAdmin={this.props.isAdmin}
          selectedListId={this.props.selectedListId}
          removeListItem={this.props.removeListItem}
          increaseVote={this.props.increaseVote}
          decreaseVote={this.props.decreaseVote}
        />
        <ListMeta />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // GLUE BETWEEN REACT AND REDUX
  //whatever is returned will show up as props on List (because it's connected below)
  //whenever state changes, this function will re run and List will re render
  return {
    listOfLists: state.listOfLists,
    selectedListId: state.selectedListId
  };
}

function mapDispatchToProps(dispatch) {
  //anything returned from this function will end up as props on List
  //whenever addListItem is called, the result should be passed to all our reducers
  return bindActionCreators({
      init: init,
      bulkAddListItems: bulkAddListItems,
      addListItem   : addListItem,
      removeListItem: removeListItem,
      increaseVote  : increaseVote,
      decreaseVote  : decreaseVote
    }
    , dispatch
  )
}

//promotes List from component to container
//needs to know about dispatch method addListItem and make it available as a prop
//TODO: LOOK AT REACT-REDUX CONNECT DOCS
export default connect(mapStateToProps, mapDispatchToProps)(List);
