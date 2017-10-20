

export function getNewListItemIncludedInListsField( currentListsInField, listToAdd ) {

  listToAdd = listToAdd.toString();

  if(currentListsInField.length > 0) {
    let currentListsInFieldArray = splitIntoArrayAndRemoveBlanks( currentListsInField );

    //return same list if already included
    if(currentListsInFieldArray.includes(listToAdd)){
      console.log('This post is already in this list!');
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
