import { toJS, fromJS, List, sort } from 'immutable';

const defaultState = [
  { id: 0, value: 'films', votes:5 },
  { id: 1, value: 'books', votes:4 },
  { id: 2, value: 'courses', votes:3 },
  { id: 3, value: 'walking', votes:2 }
];

//state argument is not application state
//just the state that the reducer is responsible for
//called when action is dispatched by the app
export default function(state=defaultState, action) {

  switch(action.type) {

    case 'ADD_LIST_ITEM':

      var idList = [];
      action.payload.theList.forEach((element) => {
        idList.push(element.id);
      });

      //stop maxId returning as 0 when there are no list elements
      var maxId = idList.length > 0 ? Math.max(...idList) : 0;

      return [...action.payload.theList, { id:(maxId+1), value:action.payload.valueToAdd, votes:0 }];

    case 'REMOVE_LIST_ITEM':

      let newList = fromJS(action.payload.theList);
      let indexOfItemToRemove = getListItemIndexFromId( newList, action.payload.targetListItemId);
      console.log(indexOfItemToRemove);
      return newList.delete(indexOfItemToRemove).toJS();


    case 'INCREASE_VOTE':
      return changeVote( action.payload.theList, action.payload.targetListItemId, 'increase');

    case 'DECREASE_VOTE':
      return changeVote( action.payload.theList, action.payload.targetListItemId, 'decrease');


    default:
      return state
  }
}

function changeVote(theList,idToChange,type) {

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


function sortListItemsByVotes(theList) {

  let newList = fromJS(theList);
  let sortedList = newList.sort(
    (a, b) => b.get('votes') - a.get('votes')
  );

  return sortedList.toJS();
}

function getListItemIndexFromId(immutableList,itemID) {

  return immutableList.findIndex(listItem => {
    return listItem.get('id') === itemID;
  });
}
