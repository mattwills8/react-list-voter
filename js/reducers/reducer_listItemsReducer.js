const defaultState = [
  { value: '1', votes:5 },
  { value: '2', votes:0 },
  { value: '3', votes:1 },
  { value: '4', votes:2 }
];

//state argument is not application state
//just the state that the reducer is responsible for
//called when action is dispatched by the app
export default function(state=defaultState, action) {

  switch(action.type) {
    case 'ADD_LIST_ITEM':
      return [...action.payload, { value:'new' }];

    default: return state
  }
}
