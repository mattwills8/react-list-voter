import { wpRequest } from '../helpers/functions_requests';

import {
  SELECT_LIST,
  ADD_LIST,
  REMOVE_LIST,
  BULK_ADD_LIST_ITEM,
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  INCREASE_VOTE,
  DECREASE_VOTE,
  GET_LIST_MEDIA
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
  let posts = request.listItemPosts();

  console.log(posts);

  return {
    type: BULK_ADD_LIST_ITEM,
    payload: posts,
    meta: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      valuesToAdd: valuesToAdd
    }
  };
}

export function addListItem(listOfLists, selectedListId, valueToAdd) {

  let request = new wpRequest;
  let postToAdd = request.listItemPostsById( valueToAdd.postID );

  //TODO: change this get request to the url given by post["_links"]["wp:featuredmedia"][0].href
  let mediaRoot = 'http://localhost/WooCommerce%20Test%20Site/index.php/wp-json/wp/v2/media/';

  return dispatch => {
    postToAdd.then((post) => {

      let mediaRequest = request.getUrl(`${mediaRoot}${post.data["featured_media"]}`);

      valueToAdd.postContent = post.data;

      dispatch({
        type: ADD_LIST_ITEM,
        payload: mediaRequest,
        meta: {
          listOfLists: listOfLists,
          selectedListId: selectedListId,
          valueToAdd: valueToAdd,
        }
      });
    })
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

export function getListMedia( getURL ) {
  return {
    type: GET_LIST_MEDIA,

  }
}
