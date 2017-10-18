import { wpRequest } from '../helpers/class_requests';

import {
  INIT,
  INIT_GET_LISTS_SUCCESS,
  INIT_GET_LIST_ITEMS_SUCCESS,
  INIT_POPULATED_LISTS_SUCCESS,
  SELECT_LIST,
  ADD_LIST,
  REMOVE_LIST,
  BULK_ADD_LIST_ITEM,
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  INCREASE_VOTE,
  DECREASE_VOTE,
  GET_LIST_ITEM_MEDIA
} from './types.js';


export function init() {

  let initRequest = new wpRequest();

  let lists = initRequest.getLists();

  return dispatch => {
    lists.then((response) => {

      let lists = response.data;

      let listOfLists = lists.map( list => {
        return { name: list.name, id: list.term_id };
      });

      var listItems = initRequest.getListItemPosts();

      dispatch({
        type: INIT,
        payload: listItems,
        meta: {
          lists: listOfLists
        }
      });
    }
  )}
}

export function initPopulateLists() {

  var initRequest = new wpRequest();

  return (dispatch, getState) => {

    // get lists
    dispatch(initGetLists()).then(getListsResponse => {

      var lists = getListsResponse;

      // get list items
      initRequest.getListItemPosts().then(getListItemsResponse => {

        dispatch({
          type: INIT_GET_LIST_ITEMS_SUCCESS,
        });

        var listItems = getListItemsResponse.data;

        // populate lists
        var populatedLists = lists.map( list => {

          list.list = listItems.reduce( (listItemsInList, listItem) => {

            if(listItem.acf.included_in_lists.split(",").includes(String(list.id))){

              // structure of list item object initialised here
              let finalListItem = {
                id: listItem.id,
                values: {
                  postID: listItem.id,
                  postContent: {
                    title: listItem.title,
                    content: listItem.content,
                    "_links": listItem["wp:featuredmedia"]
                  },
                  postMedia: {
                    postImage: {
                      src: "",
                    },
                  },
                },
                votes: listItem.acf.list_voter_votes
              };

              listItemsInList.push(finalListItem);
            }

            return listItemsInList;
          }, []); //end reduce

          return list
        }); //end map

        dispatch({
          type: INIT_POPULATED_LISTS_SUCCESS,
          payload: populatedLists,
        });
      });
    });

  }
}

export function initGetLists() {

  let initRequest = new wpRequest();

  let lists = initRequest.getLists();

  return dispatch => {
    return lists.then((response) => {

      let lists = response.data;

      let listOfLists = lists.map( list => {
        return { name: list.name, id: list.term_id };
      });

      dispatch({
        type: INIT_GET_LISTS_SUCCESS,
      });

      return listOfLists;

    });
  }
}

export function getListItemMedia( listItem ) {

  //TODO: change this get request to the url given by post["_links"]["wp:featuredmedia"][0].href
  let request = new wpRequest()
  let mediaRoot = request.ROOT_URL_FOR_MEDIA;

  return dispatch => {

      let mediaRequest = request.getUrl(`${mediaRoot}${listItem.values.postContent["_links"]["wp:featuredmedia"].href}`);

      mediaRequest.then((response) => {

        listItem.post.postMedia.postImage.src = response.data.guid.rendered;
      });

      return listItem;
  }
}

export function getListsAndLogState() {

  return (dispatch, getState) => {
    dispatch(initGetLists()).then(() => {
      console.log(getState());
    })
  }
}


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
