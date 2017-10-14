import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducers from '../reducers';

import List from '../containers/List';
import ListSelector from '../containers/ListSelector';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(
      promiseMiddleware(),
      thunk
    )
));

class App extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-4 list-selector">
          <ListSelector />
        </div>
        <div className="col-8 list-editor">
          <List />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#app')
);
