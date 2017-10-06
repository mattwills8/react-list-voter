import { toJS, fromJS, List, sort } from 'immutable';



export function updateListOfLists(listOfLists, selectedListId, newList) {

  let newListOfLists = fromJS(listOfLists);

  return newListOfLists.setIn([selectedListId, 'list'], newList).toJS();
}



export function changeVote(listOfLists, selectedListId, targetListItemId, type) {

  if(!['increase','decrease'].includes(type)){
    console.log('Error... changeVote only takes increase or decrease as type argument');
    return theList;
  }

  console.log(listOfLists);
  console.log(selectedListId);

  let newList = fromJS(getListBySelectedListId(listOfLists, selectedListId));
  let indexOfItemToUpdate = getListItemIndexFromId(newList, targetListItemId);

  let newVotes;
  let currentVotes = newList.getIn([indexOfItemToUpdate,'votes'])

  newVotes = type === 'increase' ? (currentVotes + 1) : (currentVotes - 1);

  newList = newList.setIn([indexOfItemToUpdate, 'votes'], newVotes);

  newList = sortListItemsByVotes(newList.toJS());

  return updateListOfLists(listOfLists, selectedListId, newList);
}



export function sortListItemsByVotes(theList) {

  let newList = fromJS(theList);
  let sortedList = newList.sort(
    (a, b) => b.get('votes') - a.get('votes')
  );

  return sortedList.toJS();
}



export function getListBySelectedListId(listOfLists, selectedListId) {

  return listOfLists.filter(function( obj ) {
    return obj.id === selectedListId;
  })[0].list;
}



export function getListItemIndexFromId(immutableList,itemID) {

  return immutableList.findIndex(listItem => {
    return listItem.get('id') === itemID;
  });
}
