import { toJS, fromJS, List, sort } from 'immutable';

import { updateListOfLists, changeVote, sortListItemsByVotes, getListBySelectedListId, getListItemIndexFromId } from '../helpers/functions_list';
import listOfLists from '../data/listOfLists.js';

//state argument is not application state
//just the state that the reducer is responsible for
//called when action is dispatched by the app

//TODO: FINISH LINKING UP REDUCERS TO NEW LISTOFLISTS USING updateListOfLists()
export default function(state=listOfLists, action) {

  switch(action.type) {

    case 'ADD_LIST_ITEM':

      var theList = getListBySelectedListId(action.payload.listOfLists, action.payload.selectedListId);

      var idList = [];
      theList.forEach((element) => {
        idList.push(element.id);
      });

      //stop maxId returning as 0 when there are no list elements
      var maxId = idList.length > 0 ? Math.max(...idList) : 0;

      let appendedList = [...theList, { id:(maxId+1), value:action.payload.valueToAdd, votes:0 }];

      return updateListOfLists(action.payload.listOfLists, action.payload.selectedListId, appendedList);

    case 'REMOVE_LIST_ITEM':

      var theList = fromJS(getListBySelectedListId(action.payload.listOfLists, action.payload.selectedListId));
      let indexOfItemToRemove = getListItemIndexFromId( theList, action.payload.targetListItemId);

      let shortenedList = theList.delete(indexOfItemToRemove).toJS();
      
      return updateListOfLists(action.payload.listOfLists, action.payload.selectedListId, shortenedList);


    case 'INCREASE_VOTE':
      return changeVote( action.payload.theList, action.payload.targetListItemId, 'increase');

    case 'DECREASE_VOTE':
      return changeVote( action.payload.theList, action.payload.targetListItemId, 'decrease');


    default:
      return state
  }
}
