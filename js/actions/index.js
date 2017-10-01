export function addListItem(theList) {
  console.log('add list item');
  //this is an action creator and needs to return an action
  // ie an object with a type (and payload) property
  return {
    type: 'ADD_LIST_ITEM',
    payload: theList
  };
}
