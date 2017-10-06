//core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//action creators
import { addListItem, removeListItem } from '../actions';
import { increaseVote, decreaseVote } from '../actions';

//components
import ListItems from '../components/ListItems';
import AddListItemForm from '../components/AddListItemForm';


class List extends Component {

  render() {

    const theList = this.props.theList;

    return (
      <div>
        <AddListItemForm
            theList={theList}
            onClick={this.props.addListItem}
          />
        <ListItems
          theList={theList}
          removeListItem={this.props.removeListItem}
          increaseVote={this.props.increaseVote}
          decreaseVote={this.props.decreaseVote}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // GLUE BETWEEN REACT AND REDUX
  //whatever is returned will show up as props on List (because it's connected below)
  //whenever state changes, this function will re run and List will re render
  return {
    theList: state.theList
  };
}

function mapDispatchToProps(dispatch) {
  //anything returned from this function will end up as props on List
  //whenever addListItem is called, the result should be passed to all our reducers
  return bindActionCreators({
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
