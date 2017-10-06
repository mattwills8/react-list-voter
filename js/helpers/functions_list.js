import { toJS, fromJS, List, sort } from 'immutable';



export function updateListOfLists(listOfLists, selectedListId, newList) {

  let newListOfLists = fromJS(listOfLists);

  return newListOfLists.setIn([selectedListId, 'list'], newList).toJS();
}



export function changeVote(theList,idToChange,type) {

  if(!['increase','decrease'].includes(type)){
    console.log('Error... changeVote only takes increase or decrease as type argument');
    return theList;
  }

  let newList = fromJS(theList);
  let indexOfListToUpdate = getListItemIndexFromId(newList,idToChange);

  let newVotes;
  let currentVotes = newList.getIn([indexOfListToUpdate,'votes'])

  newVotes = type === 'increase' ? (currentVotes + 1) : (currentVotes - 1);

  newList = newList.setIn([indexOfListToUpdate, 'votes'], newVotes);

  return sortListItemsByVotes(newList.toJS());
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
