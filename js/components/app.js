import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers';

import List from '../containers/List';

const createStoreWithMiddleware = applyMiddleware()(createStore);


class App extends React.Component {
  render() {
    return (
      <List />
    );
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('#app')
);
