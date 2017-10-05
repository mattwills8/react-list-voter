export function addListItem(theList, valueToAdd) {
  //this is an action creator and needs to return an action
  // ie an object with a type (and payload) property
  return {
    type: 'ADD_LIST_ITEM',
    payload: {
      theList: theList,
      valueToAdd: valueToAdd
    }
  };
}

export function increaseVote(theList, targetListItemId) {
  return {
    type: 'INCREASE_VOTE',
    payload: {
      theList: theList,
      targetListItemId: targetListItemId
    }
  }
}

export function decreaseVote(theList, targetListItemId) {
  return {
    type: 'DECREASE_VOTE',
    payload: {
      theList: theList,
      targetListItemId: targetListItemId
    }
  }
}
