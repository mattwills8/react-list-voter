import { toJS, fromJS, List} from 'immutable';

import {
  changeVote,
  sortListItemsByVotes,
  getListItemIndexFromId
} from '../helpers/functions_list';

import {
  SELECT_LIST
} from '../actions/types.js';

export default function(state=0, action) {

  switch(action.type) {
    case SELECT_LIST:
      return action.payload.selectedListId;

    default:
      return state;
  }
}
