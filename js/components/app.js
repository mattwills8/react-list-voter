import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from '../reducers';

import List from '../containers/List';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


class App extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-4">
        </div>
        <div className="col-8">
          <List />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('#app')
);
