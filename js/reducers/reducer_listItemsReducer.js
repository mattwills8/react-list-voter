import { toJS, fromJS, List, sort } from 'immutable';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';

import {
  updateListOfLists,
  changeVote,
  sortListItemsByVotes,
  getListBySelectedListId,
  getListItemIndexFromId,
  addListItems,
  getMaxId
} from '../helpers/functions_list';

import {
    INIT,
    INIT_FETCHED_MEDIA,
    INIT_GET_LISTS_SUCCESS,
    INIT_GET_LIST_ITEMS_SUCCESS,
    INIT_POPULATED_LISTS_SUCCESS,
    ADD_LIST,
    REMOVE_LIST,
    BULK_ADD_LIST_ITEM,
    ADD_LIST_ITEM,
    REMOVE_LIST_ITEM,
    INCREASE_VOTE,
    DECREASE_VOTE
} from '../actions/types.js';

import listOfLists from '../data/listOfLists.js';

//state argument is not application state
//just the state that the reducer is responsible for
//called when action is dispatched by the app

export default function(state=listOfLists, action) {

  switch(action.type) {

    case INIT_FETCHED_MEDIA:
      return action.payload;

    case INIT_POPULATED_LISTS_SUCCESS:
      return action.payload;


    case ADD_LIST:

      var maxId = getMaxId(action.payload.listOfLists) || 0;
      var newId = maxId === 0 ? 0 : maxId + 1;

      var newListOfLists = fromJS(action.payload.listOfLists);

      var newList = {
        name: action.payload.valueToAdd.name,
        id: newId,
        list: []
      }

      return newListOfLists.insert(newListOfLists.size, newList).toJS();

    case REMOVE_LIST:

      var newListOfLists = fromJS(action.payload.listOfLists);

      var indexOfListToRemove = getListItemIndexFromId(newListOfLists,action.payload.listId);

      return newListOfLists.delete(indexOfListToRemove).toJS();


    case BULK_ADD_LIST_ITEM:

      console.log(action.payload.valuesToAdd);

      return addListItems(action.payload.listOfLists, action.payload.selectedListId,action.payload.valuesToAdd);


    case `${ADD_LIST_ITEM}_FULFILLED`:

      action.meta.valueToAdd.postMedia = {
        postImage: {
          src: action.payload.data.guid.rendered
        }
      };

      return addListItems(action.meta.listOfLists, action.meta.selectedListId,[action.meta.valueToAdd]);


    case REMOVE_LIST_ITEM:

      var theList = fromJS(getListBySelectedListId(action.payload.listOfLists, action.payload.selectedListId));
      let indexOfItemToRemove = getListItemIndexFromId( theList, action.payload.targetListItemId);

      let shortenedList = theList.delete(indexOfItemToRemove).toJS();

      return updateListOfLists(action.payload.listOfLists, action.payload.selectedListId, shortenedList);


    case INCREASE_VOTE:
      return changeVote( action.payload.listOfLists, action.payload.selectedListId, action.payload.targetListItemId, 'increase');

    case DECREASE_VOTE:
      return changeVote( action.payload.listOfLists, action.payload.selectedListId, action.payload.targetListItemId, 'decrease');


    default:
      return state
  }
}
