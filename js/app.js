import React from 'react';
import ReactDOM from 'react-dom';

var myList = ['1','2','3','4'];

var listItems = myList.map((item, i) =>
  <li id={"key_"+i}>{item}</li>
);

var list = (
  <ul>{listItems}</ul>
);

ReactDOM.render(
  list,
  document.getElementById('app')
);
