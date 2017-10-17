import { wpRequest } from '../helpers/class_requests';

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
  let posts = request.getListItemPosts();

  //TODO: change this get request to the url given by post["_links"]["wp:featuredmedia"][0].href
  let mediaRoot = 'http://localhost/WooCommerce%20Test%20Site/index.php/wp-json/wp/v2/media/';

  return dispatch => {
    posts.then((response) => {

      let posts = response.data;
      let postMediaLinks = [];

      //assigns post object to each value to add
      valuesToAdd.forEach( valueToAdd => {
        let postToAdd = posts.filter(function( post ) {
          return post.id == valueToAdd.postID;
        })[0];

        valueToAdd.postContent = postToAdd || null;
      });

      //gets media link for each value to add
      var itemsProcessed = 0;
      valuesToAdd.forEach( valueToAdd => {

        request.getUrl(`${mediaRoot}${valueToAdd.postContent["featured_media"]}`)
          .then((mediaResponse) => {
            valueToAdd.postMedia = {
              postImage: {
                src: mediaResponse.data.guid.rendered
              }
            };

            //when all api requests have been processed, dispatch the action creator
            itemsProcessed++;
            if(itemsProcessed === valuesToAdd.length) {
              dispatch({
                type: BULK_ADD_LIST_ITEM,
                payload: {
                  listOfLists: listOfLists,
                  selectedListId: selectedListId,
                  valuesToAdd: valuesToAdd,
                }
              });
            }
          });
      });
    })
  };
}

export function addListItem(listOfLists, selectedListId, valueToAdd) {

  let request = new wpRequest;
  let postToAdd = request.getListItemPostsById( valueToAdd.postID );

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
