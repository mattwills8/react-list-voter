import { wpRequest } from '../helpers/functions_requests';

import {
  SELECT_LIST,
  ADD_LIST,
  REMOVE_LIST,
  BULK_ADD_LIST_ITEM,
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  INCREASE_VOTE,
  DECREASE_VOTE
} from './types.js';


export function selectList(selectedListId) {
  return {
    type: SELECT_LIST,
    payload: {
      selectedListId: selectedListId,
    }
  };
}

export function addList(listOfLists, valueToAdd) {
  return {
    type: ADD_LIST,
    payload: {
      listOfLists: listOfLists,
      valueToAdd: valueToAdd
    }
  };
}

export function removeList(listOfLists, listId) {
  return {
    type: REMOVE_LIST,
    payload: {
      listOfLists: listOfLists,
      listId: listId
    }
  };
}

export function bulkAddListItems(listOfLists, selectedListId, valuesToAdd) {

  let request = new wpRequest;
  let posts = request.allPosts();

  return {
    type: BULK_ADD_LIST_ITEM,
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      valuesToAdd: valuesToAdd,
      posts:posts
    }
  };
}

export function addListItem(listOfLists, selectedListId, valueToAdd) {

  let request = new wpRequest;
  let postToAdd = request.postById( valueToAdd.postID );

  console.log(valueToAdd);

  return {
    type: ADD_LIST_ITEM,
    payload: postToAdd,
    meta: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      valueToAdd: valueToAdd
    }
  };
}

export function removeListItem(listOfLists, selectedListId, targetListItemId) {
  return {
    type: REMOVE_LIST_ITEM,
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      targetListItemId: targetListItemId
    }
  };
}

export function increaseVote(listOfLists, selectedListId, targetListItemId) {
  return {
    type: INCREASE_VOTE,
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      targetListItemId: targetListItemId
    }
  }
}

export function decreaseVote(listOfLists, selectedListId, targetListItemId) {
  return {
    type: DECREASE_VOTE,
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      targetListItemId: targetListItemId
    }
  }
}
