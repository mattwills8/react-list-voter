import {combineReducers} from 'redux';
import listItemsReducer from './reducer_listItems';

const rootReducer = combineReducers({
  //state: (state = {}) => state
  listItems: listItemsReducer
})

export default rootReducer;
