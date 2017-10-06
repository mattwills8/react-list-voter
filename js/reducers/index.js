import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import listItemsReducer from './reducer_listItemsReducer';
import listSelectorReducer from './reducer_listSelectorReducer';

const rootReducer = combineReducers({
  //state: (state = {}) => state
  theList: listItemsReducer,
  listOfLists: listSelectorReducer
});

const store = createStore(rootReducer, /* preloadedState,*/  devToolsEnhancer(
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
));

export default rootReducer;
