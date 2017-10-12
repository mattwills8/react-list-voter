import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import listItemsReducer from './reducer_listItemsReducer';
import listSelectorReducer from './reducer_listSelectorReducer';

const rootReducer = combineReducers({
  //state: (state = {}) => state
  listOfLists: listItemsReducer,
  selectedListId: listSelectorReducer
});

export default rootReducer;
