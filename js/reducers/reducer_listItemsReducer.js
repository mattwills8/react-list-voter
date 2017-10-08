import { toJS, fromJS, List, sort } from 'immutable';

import { updateListOfLists, changeVote, sortListItemsByVotes, getListBySelectedListId, getListItemIndexFromId, addListItems, getMaxId } from '../helpers/functions_list';
import listOfLists from '../data/listOfLists.js';

//state argument is not application state
//just the state that the reducer is responsible for
//called when action is dispatched by the app

//TODO: FINISH LINKING UP REDUCERS TO NEW LISTOFLISTS USING updateListOfLists()
export default function(state=listOfLists, action) {

  switch(action.type) {

    case "ADD_LIST":

      var maxId = getMaxId(action.payload.listOfLists) || 0;
      var newId = maxId === 0 ? 0 : maxId + 1;

      var newListOfLists = fromJS(action.payload.listOfLists);

      var newList = {
        name: action.payload.valueToAdd.name,
        id: newId,
        list: []
      }

      return newListOfLists.insert(newListOfLists.size, newList).toJS();

    case 'REMOVE_LIST':

      var newListOfLists = fromJS(action.payload.listOfLists);

      var indexOfListToRemove = getListItemIndexFromId(newListOfLists,action.payload.listId);

      return newListOfLists.delete(indexOfListToRemove).toJS();


    case 'BULK_ADD_LIST_ITEM':

      return addListItems(action.payload.listOfLists, action.payload.selectedListId,action.payload.valuesToAdd);


    case 'ADD_LIST_ITEM':

      return addListItems(action.payload.listOfLists, action.payload.selectedListId,[action.payload.valueToAdd])


    case 'REMOVE_LIST_ITEM':

      var theList = fromJS(getListBySelectedListId(action.payload.listOfLists, action.payload.selectedListId));
      let indexOfItemToRemove = getListItemIndexFromId( theList, action.payload.targetListItemId);

      let shortenedList = theList.delete(indexOfItemToRemove).toJS();

      return updateListOfLists(action.payload.listOfLists, action.payload.selectedListId, shortenedList);


    case 'INCREASE_VOTE':
      return changeVote( action.payload.listOfLists, action.payload.selectedListId, action.payload.targetListItemId, 'increase');

    case 'DECREASE_VOTE':
      return changeVote( action.payload.listOfLists, action.payload.selectedListId, action.payload.targetListItemId, 'decrease');


    default:
      return state
  }
}
