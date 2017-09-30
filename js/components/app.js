import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import List from '../containers/List';


class App extends React.Component {
  render() {
    return <List />;
  }
}

ReactDOM.render(
	<App />,
  document.getElementById('app')
);
