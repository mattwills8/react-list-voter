import { toJS, fromJS, List, sort } from 'immutable';


/*
* input: listOfLists, id of list currently in editor, list to replace it with
* return: updated listOfLists
*/
export function updateListOfLists(listOfLists, selectedListId, newList) {

  let newListOfLists = fromJS(listOfLists);

  return newListOfLists.setIn([selectedListId, 'list'], newList).toJS();
}

/*
* input: listOfLists, id of list currently in editor, if of list item to change, increase or decrease
* return: updated listOfLists
*/
export function changeVote(listOfLists, selectedListId, targetListItemId, type) {

  if(!['increase','decrease'].includes(type)){
    console.log('Error... changeVote only takes increase or decrease as type argument');
    return theList;
  }

  let newList = fromJS(getListBySelectedListId(listOfLists, selectedListId));
  let indexOfItemToUpdate = getListItemIndexFromId(newList, targetListItemId);

  let newVotes;
  let currentVotes = newList.getIn([indexOfItemToUpdate,'votes'])

  newVotes = type === 'increase' ? (currentVotes + 1) : (currentVotes - 1);

  newList = newList.setIn([indexOfItemToUpdate, 'votes'], newVotes);

  newList = sortListItemsByVotes(newList.toJS());

  return updateListOfLists(listOfLists, selectedListId, newList);
}


/*
* input: an array of objects that have a 'votes' property
* return: same array sorted by 'votes' property largest to smallest
*/
export function sortListItemsByVotes(theList) {

  let newList = fromJS(theList);
  let sortedList = newList.sort(
    (a, b) => b.get('votes') - a.get('votes')
  );

  return sortedList.toJS();
}


/*
* input: listOfLists, id of list currently in editor
* return: list currently in editor as array
*/
export function getListBySelectedListId(listOfLists, selectedListId) {

  return listOfLists.filter(function( obj ) {
    return obj.id === selectedListId;
  })[0].list;
}


/*
* input: immutable List of objects with id proprty, id of target list item
* return: List index of target list item
*/
export function getListItemIndexFromId(immutableList,itemID) {

  return immutableList.findIndex(listItem => {
    return listItem.get('id') === itemID;
  });
}
