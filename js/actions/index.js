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
                    acf: {
                        "list_voter_votes": "",
                        "included_in_lists": ""
                    },
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

  let request = new wpRequest();

  return dispatch => {

    return request.postNewList( valueToAdd.name ).then( () => {

      dispatch( {
        type: ADD_LIST,
        payload: {
          listOfLists: listOfLists,
          valueToAdd: valueToAdd
        }
      });
    });
  }
}

export function removeList(listOfLists, listId) {

  let request = new wpRequest();
  let listsItemsInList = listOfLists.filter( list => {
    return list.id === listId;
  })[0].list;

  return dispatch => {

    //remove list from terms in db
    return request.postRemoveList( listId ).then( () => {

      let removeListFromListItemPromises = [];

      //remove list from 'lists in' field for each list item in the list
      listsItemsInList.map( listItem => {

        let newIncludedInLists = getNewListItemIncludedInListsField( listItem.values.postContent.acf["included_in_lists"], listId, 'remove' );

        removeListFromListItemPromises.push(request.postNewListsIn( listItem.values.postID , newIncludedInLists ));
        removeListFromListItemPromises.push(request.postNewVotes( listItem.values.postID, "" ));
      });

      //once all requests are done dispatch the aciton
      Promise.all(removeListFromListItemPromises).then( () => {

        dispatch( {
          type: REMOVE_LIST,
          payload: {
            listOfLists: listOfLists,
            listId: listId
          }
        });
      })
    });
  }
}




export function bulkAddListItems(listOfLists, selectedListId, valuesToAdd) {

  let request = new wpRequest;
  let posts = request.getListItemPosts();

  let mediaRoot = request.ROOT_URL_FOR_MEDIA;

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

        // only send request if item wasnt already in a list
        // note we could turn this off one day and included_in_lists logic would still work, issue was we only had one field for storing votes
        if( ! postToAdd.acf["included_in_lists"].length > 0) {

          // add promise of api call to update list item 'lists in' field
          let newIncludedInLists = getNewListItemIncludedInListsField( postToAdd.acf["included_in_lists"], selectedListId, 'add' );

          // add promise of api call to upate list item votes field
          updateListsContainedInRequestPromises.push(request.postNewListsIn( valueToAdd.postID , newIncludedInLists ));
        }
      });

      // remove new ones that are already in a list
      valuesToAdd = valuesToAdd.filter( valueToAdd => {
        return (valueToAdd.postContent.acf["included_in_lists"].length == 0);
      });

      // continue with media requests once lists have been updated
      Promise.all(updateListsContainedInRequestPromises).then( () => {

        var itemsProcessed = 0;
        valuesToAdd.forEach( (valueToAdd, index) => {

          //gets media link for each value to add
          request.getUrl(`${mediaRoot}${valueToAdd.postContent["featured_media"]}`)
            .then(
            mediaResponse => {

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
            },
            error => {
              // add image src to new list item from media response
              valueToAdd.postMedia = {
                postImage: {
                  src: ''
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
            }
          );
        });
      });
    })
  };
}




export function addListItem(listOfLists, selectedListId, valueToAdd) {

  let request = new wpRequest;
  let postToAdd = request.getListItemPostsById( valueToAdd.postID );

  let mediaRoot = request.ROOT_URL_FOR_MEDIA;

  return dispatch => {

    // get post to add to list item from wp
    postToAdd.then((post) => {

      // exit action creator if item was already in a list
      // note we could turn this off one day and included_in_lists logic would still work, issue was we only had one field for storing votes
      if( post.data.acf["included_in_lists"].length > 0) {
        alert('Oops! This list item is already in a list!');
        return;
      }

      // add post content to list item
      valueToAdd.postContent = post.data;

      // send request for post media
      let mediaRequest = request.getUrl(`${mediaRoot}${post.data["featured_media"]}`)
        .then(
        mediaResponse => {

          // add image src to new list item from media response
          valueToAdd.postMedia = {
            postImage: {
              src: mediaResponse.data.guid.rendered
            }
          };

          let newIncludedInLists = getNewListItemIncludedInListsField( post.data.acf["included_in_lists"], selectedListId, 'add' );

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
        },
        //if no featured image, set src as empty string and continue
        error => {

          valueToAdd.postMedia = {
            postImage: {
              src: ''
            }
          };

          let newIncludedInLists = getNewListItemIncludedInListsField( post.data.acf["included_in_lists"], selectedListId, 'add' );

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
        }
      );
    })
  };
}




export function removeListItem(listOfLists, selectedListId, targetListItemId) {

  let request = new wpRequest();

  let listItem = getCurrentListItem(listOfLists, selectedListId, targetListItemId);

  return dispatch => {

    let newIncludedInLists = getNewListItemIncludedInListsField( listItem.values.postContent.acf["included_in_lists"], selectedListId, 'remove' );

    let promises = [
      request.postNewListsIn( listItem.id , newIncludedInLists ),
      request.postNewVotes( listItem.id , "" ),
    ];


    Promise.all(promises).then( () => {

      // send action once both are complete
      dispatch( {
        type: REMOVE_LIST_ITEM,
        payload: {
          listOfLists: listOfLists,
          selectedListId: selectedListId,
          targetListItemId: targetListItemId
        }
      });
    });
  }
}



export function increaseVote(listOfLists, selectedListId, targetListItemId) {

  let request = new wpRequest();

  let listItem = getCurrentListItem(listOfLists, selectedListId, targetListItemId);

  return dispatch => {

    return request.getListItemPostsById( listItem.values.postID ).then( response => {

      let currentVotes = response.data.acf["list_voter_votes"];

      let newVotes =  (parseInt(currentVotes) + 1).toString();

      let voteRequest = request.postNewVotes( listItem.values.postID, newVotes );

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
    });
  }
}




export function decreaseVote(listOfLists, selectedListId, targetListItemId) {

  let request = new wpRequest();

  let listItem = getCurrentListItem(listOfLists, selectedListId, targetListItemId);

  return dispatch => {

    return request.getListItemPostsById( listItem.values.postID ).then( response => {

      let currentVotes = response.data.acf["list_voter_votes"];

      let newVotes =  (parseInt(currentVotes) - 1).toString();

      let voteRequest = request.postNewVotes( listItem.values.postID, newVotes );

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
    });
  }
}




function getCurrentVotes(listOfLists, selectedListId, targetListItemId) {

  return getCurrentListItem(listOfLists, selectedListId, targetListItemId).votes;
}

function getCurrentListItem(listOfLists, selectedListId, targetListItemId) {

  let currentList = listOfLists.filter( list => {
    return list.id === selectedListId;
  })[0];

  return currentList.list.filter( listItem => {
    return listItem.id === targetListItemId;
  })[0];
}
