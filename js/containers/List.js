import React, {Component} from 'react';
import {connect} from 'react-redux';

import ListItems from './ListItems';


export default class List extends Component {

  render() {

    const theList = ['1','2','3','4','another'];

    return (
      <ul>
        <ListItems
          className="list"
          myList={theList}
        />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  // GLUE BETWEEN REACT AND REDUX
  //whatever is returned will show up as props inside of List
  //whenever state changes, this function will re run and List will re render
  return {
    theList: state.theList
  };
}

export default connect(mapStateToProps)(List);
