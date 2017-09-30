import {combineReducers} from 'redux';
import listItemsReducer from './reducer_listItems';

const rootReducer = combineReducers({
  //state: (state = {}) => state
  theList: listItemsReducer
})

export default rootReducer;
