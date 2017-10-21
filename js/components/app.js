import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducers from '../reducers';

import List from '../containers/List';
import ListSelector from '../containers/ListSelector';

// set up store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(
      promiseMiddleware(),
      thunk
    )
));

// get data domain from html - ie display admin or certain list
const dataDomain = document.getElementById('app').dataset.domain;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.renderApp = this.renderApp.bind(this);
  }

  renderApp() {
    if(this.props.dataDomain === 'admin') {
      return (
        <div className="row">
          <div className="col-sm-4 list-selector">
            <ListSelector
              isAdmin={true}/>
          </div>
          <div className="col-sm-8 list-editor admin">
            <List
              isAdmin={true}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="row">
          <div className="col-12 list-editor">
            <List
              isAdmin={false}
              dataDomain={this.props.dataDomain} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderApp()}
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App
      dataDomain={dataDomain} />
  </Provider>
  , document.querySelector('#app')
);
