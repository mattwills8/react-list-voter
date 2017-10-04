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
      action.payload.forEach((element) => {
        idList.push(element.id);
      });
      var maxId = Math.max(...idList);

      return [...action.payload, { id:(maxId+1), value:'new', votes:0 }];


    case 'INCREASE_VOTE':
      return changeVote(action.payload.theList,action.payload.targetListItemId,'increase');

    case 'DECREASE_VOTE':
      return changeVote(action.payload.theList,action.payload.targetListItemId,'decrease');


    default:
      return state
  }
}

function changeVote(theList,idToChange,type) {

  let newList = fromJS(theList);
  let newVotes;

  let indexOfListToUpdate = newList.findIndex(listItem => {
    return listItem.get('id') === idToChange;
  });

  let currentVotes = newList.getIn([indexOfListToUpdate,'votes'])

  if(!['increase','decrease'].includes(type)){
    console.log('Error... changeVote only takes increase or decrease as type argument');
    return newList.toJS();
  }

  newVotes = type === 'increase' ? (currentVotes + 1) : (currentVotes - 1);

  newList = newList.setIn([indexOfListToUpdate, 'votes'], newVotes);

  return sortListItems(newList.toJS());
}

function sortListItems(theList) {

  let newList = fromJS(theList);
  let sortedList = newList.sort(
    (a, b) => b.get('votes') - a.get('votes')
  );

  return sortedList.toJS();
}
