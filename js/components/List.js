import React, {Component} from 'react';

import ListItems from './ListItems';


export default class List extends Component {

  render() {

    const theList = ['1','2','3','4','another'];

    return (
      <ul>
        <ListItems myList={theList} />
      </ul>
    );
  }
}
