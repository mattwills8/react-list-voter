import { wpRequest } from '../helpers/class_requests';

import {
  INIT,
  INIT_FETCHED_MEDIA,
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

import {
  getNewListItemIncludedInListsField,
  listItemIsAlreadyInList,
} from '../helpers/functions_requestHelpers';


/*
*
* START OF INIT SEQUENCE LOGIC
*
*/

export function init() {

  var initRequest = new wpRequest();
  let mediaRoot = initRequest.ROOT_URL_FOR_MEDIA;

  return (dispatch, getState) => {

    return dispatch(initPopulateLists()).then( populatedLists => {

      var listOfLists = populatedLists;

      // set up array of promises
      const mediaPromises = [];


      // set media request promise for each list item
      listOfLists.forEach( list => {
        list.list.map( listItem => {

          let mediaRequest = initRequest.getUrl(`${mediaRoot}${listItem.values.postContent["featured_media"]}`);
          listItem.values.postMedia.tmp = mediaRequest;
          mediaPromises.push(mediaRequest);
        });
      });

      // set image src from promise response
      Promise.all(mediaPromises).then( (response) => {
        listOfLists.forEach( list => {
          list.list.map( listItem => {

            // match correct list item image src from list of promises
            listItem.values.postMedia.postImage.src = response.filter( fetchedMedia => {
              return fetchedMedia.data.id === listItem.values.postContent["featured_media"];
            })[0].data.guid.rendered;
          });
        });



        dispatch({
          type: INIT_FETCHED_MEDIA,
          payload: listOfLists,
        });
      });
    });
  };
}

export function initPopulateLists() {

  var initRequest = new wpRequest();

  return (dispatch, getState) => {

    // get lists
    return dispatch(initGetLists()).then(getListsResponse => {

      var lists = getListsResponse;

      // get list items
      return initRequest.getListItemPosts().then(getListItemsResponse => {

        dispatch({
          type: INIT_GET_LIST_ITEMS_SUCCESS,
        });

        var listItems = getListItemsResponse.data;

        // populate lists
        var populatedLists = lists.map( list => {

          list.list = listItems.reduce( (listItemsInList, listItem) => {

            if(listItem.acf.included_in_lists.split(",").includes(String(list.id))){

              /*
              *
              * Structure of list item object initialised here
              *
              */
              let finalListItem = {
                id: listItem.id,
                values: {
                  postID: listItem.id,
                  postContent: {
                    title: listItem.title,
                    content: listItem.content,
                    "featured_media": listItem["featured_media"],
                    "_links": listItem["_links"],
                  },
                  postMedia: {
                    tmp: "",
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
          type: INIT_POPULATED_LISTS_SUCCESS
        });

        return populatedLists;
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


/*
*
* END OF INIT SEQUENCE LOGIC
*
*/


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
    //get list items
    posts.then((response) => {

      let posts = response.data;
      let postMediaLinks = [];
      let updateListsContainedInRequestPromises = [];

      valuesToAdd.map( valueToAdd => {

        // match on id to get the correct post to add to the list item
        let postToAdd = posts.filter(function( post ) {
          return post.id == valueToAdd.postID;
        })[0];

        // add post to the list item
        valueToAdd.postContent = postToAdd || null;

        // add promise of api call to update list item 'lists in' field
        let newIncludedInLists = getNewListItemIncludedInListsField( postToAdd.acf["included_in_lists"], selectedListId );

        // dont send request if item was already in list
        if( listItemIsAlreadyInList( postToAdd.acf["included_in_lists"], selectedListId ) ) {
          return;
        }

        updateListsContainedInRequestPromises.push(request.postNewListsIn( valueToAdd.postID , newIncludedInLists ));

      });

      // continue with media requests once lists have been updated
      Promise.all(updateListsContainedInRequestPromises).then( () => {

        //gets media link for each value to add
        var itemsProcessed = 0;
        valuesToAdd.forEach( valueToAdd => {

          //skip iteration if it's already in the list
          if( listItemIsAlreadyInList( valueToAdd.postContent.acf["included_in_lists"], selectedListId ) ) {
            return;
          }

          request.getUrl(`${mediaRoot}${valueToAdd.postContent["featured_media"]}`)
            .then((mediaResponse) => {

              // add image src to new list item from media response
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

    // get post to add to list item from wp
    postToAdd.then((post) => {

      // add post content to list item
      valueToAdd.postContent = post.data;

      // send request for post media
      let mediaRequest = request.getUrl(`${mediaRoot}${post.data["featured_media"]}`)
        .then( mediaResponse => {

          // add image src to new list item from media response
          valueToAdd.postMedia = {
            postImage: {
              src: mediaResponse.data.guid.rendered
            }
          };

          let newIncludedInLists = getNewListItemIncludedInListsField( post.data.acf["included_in_lists"], selectedListId );

          // exit action creator if item was already in list
          if( newIncludedInLists == post.data.acf["included_in_lists"] ) {
            return;
          }

          let newIncludedInRequest = request.postNewListsIn( valueToAdd.postID , newIncludedInLists );

          //pass request to update 'included_in_lists' field to redux promise and dispatch
          dispatch({
            type: ADD_LIST_ITEM,
            payload: newIncludedInRequest,
            meta: {
              listOfLists: listOfLists,
              selectedListId: selectedListId,
              valueToAdd: valueToAdd,
            }
          });
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

  let currentVotes = getCurrentVotes(listOfLists, selectedListId, targetListItemId);

  let newVotes =  (parseInt(currentVotes) + 1).toString();

  return dispatch => {

   let request = new wpRequest();
   let voteRequest = request.postNewVotes( targetListItemId, newVotes );

   dispatch({
     type: INCREASE_VOTE,
     payload: voteRequest,
     meta: {
       listOfLists: listOfLists,
       selectedListId: selectedListId,
       targetListItemId: targetListItemId,
       newVotes: newVotes
     }
   });
 }
}

export function decreaseVote(listOfLists, selectedListId, targetListItemId) {

  let currentVotes = getCurrentVotes(listOfLists, selectedListId, targetListItemId);

  let newVotes =  (parseInt(currentVotes) - 1).toString();

  return dispatch => {

   let request = new wpRequest();
   let voteRequest = request.postNewVotes( targetListItemId, newVotes );

   dispatch({
     type: DECREASE_VOTE,
     payload: voteRequest,
     meta: {
       listOfLists: listOfLists,
       selectedListId: selectedListId,
       targetListItemId: targetListItemId,
       newVotes: newVotes
     }
   });
 }
}

function getCurrentVotes(listOfLists, selectedListId, targetListItemId) {

  let currentList = listOfLists.filter( list => {
    return list.id === selectedListId;
  })[0];

  return currentList.list.filter( listItem => {
    return listItem.id === targetListItemId;
  })[0].votes;
}
