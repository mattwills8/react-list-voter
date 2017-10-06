export function selectList(selectedListId) {
  return {
    type: 'SELECT_LIST',
    payload: {
      selectedListId: selectedListId,
    }
  };
}

export function addListItem(listOfLists, selectedListId, valueToAdd) {
  //this is an action creator and needs to return an action
  // ie an object with a type (and payload) property
  return {
    type: 'ADD_LIST_ITEM',
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      valueToAdd: valueToAdd
    }
  };
}

export function removeListItem(listOfLists, selectedListId, targetListItemId) {
  return {
    type: 'REMOVE_LIST_ITEM',
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      targetListItemId: targetListItemId
    }
  };
}

export function increaseVote(listOfLists, selectedListId, targetListItemId) {
  return {
    type: 'INCREASE_VOTE',
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      targetListItemId: targetListItemId
    }
  }
}

export function decreaseVote(listOfLists, selectedListId, targetListItemId) {
  return {
    type: 'DECREASE_VOTE',
    payload: {
      listOfLists: listOfLists,
      selectedListId: selectedListId,
      targetListItemId: targetListItemId
    }
  }
}
