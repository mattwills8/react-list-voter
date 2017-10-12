import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';

import reducers from '../reducers';

import List from '../containers/List';
import ListSelector from '../containers/ListSelector';

const store = createStore(reducers, /* preloadedState,*/
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    ReduxPromise()
  )
);

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
