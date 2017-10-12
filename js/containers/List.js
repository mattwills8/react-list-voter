//core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//action creators
import { bulkAddListItems, addListItem, removeListItem } from '../actions';
import { increaseVote, decreaseVote } from '../actions';

//components
import ListItems from '../components/ListItems';
import AddListItemForm from '../components/AddListItemForm';
import ListMeta from '../components/ListMeta';

//helpers
import { getListObjectBySelectedListId } from '../helpers/functions_list';


class List extends Component {

  render() {

    var currentListName = getListObjectBySelectedListId(this.props.listOfLists, this.props.selectedListId).name;

    return (
      <div>
        <AddListItemForm
            listOfLists={this.props.listOfLists}
            selectedListId={this.props.selectedListId}
            bulkAddListItems={this.props.bulkAddListItems}
            addListItem={this.props.addListItem}
          />
        <div
          className="row">
          <h2 className="col-12 text-center">
            Selected List: {currentListName}
          </h2>
        </div>
        <ListItems
          listOfLists={this.props.listOfLists}
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
