

export function getNewListItemIncludedInListsField( currentListsInField, listId, type ) {

  switch(type) {

    case 'add':
      return addNewListToIncludedInListsField( currentListsInField, listId);

    case 'remove':
      return removeListFromIncludedInListsField( currentListsInField, listId);

    }
}


export function removeListFromIncludedInListsField( currentListsInField, listId) {

  let listToRemove = listId.toString();

  return splitIntoArrayAndRemoveBlanks( currentListsInField )
    .splice(listId)
    .join();

}


export function addNewListToIncludedInListsField( currentListsInField, listToAdd) {

  listToAdd = listToAdd.toString();

  if(currentListsInField.length > 0) {
    let currentListsInFieldArray = splitIntoArrayAndRemoveBlanks( currentListsInField );

    //return same list if already included
    if(currentListsInFieldArray.includes(listToAdd)){
      return currentListsInField;
    }

    return [...currentListsInFieldArray, listToAdd.toString()].join();
  }

  // if not currently in any lists just add as the first one
  return listToAdd;

}

export function listItemIsAlreadyInList( listItemIncludedInListsField, listToCheck) {

  return splitIntoArrayAndRemoveBlanks(listItemIncludedInListsField).includes(listToCheck.toString());
}


export function splitIntoArrayAndRemoveBlanks( string ) {

  return string.split(",").filter( el => {
    return el !== '';
  })
}
