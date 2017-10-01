const defaultState = [
  { id: 1, value: '1', votes:5 },
  { id: 2, value: '2', votes:0 },
  { id: 3, value: '3', votes:1 },
  { id: 4, value: '4', votes:2 }
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

      action.payload.forEach((listItem) => {
        if(listItem.id === targetListItemId){
          litItem.votes ++;
        }
      });

      return action.payload;

    default:
      return state
  }
}
