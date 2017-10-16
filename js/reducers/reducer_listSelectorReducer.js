import { toJS, fromJS, List} from 'immutable';

import {
  changeVote,
  sortListItemsByVotes,
  getListItemIndexFromId
} from '../helpers/functions_list';

import {
  SELECT_LIST
} from '../actions/types.js';

const dataDomain = document.getElementById('app').dataset.domain;

//convert to integer if not admin
var initialState = dataDomain === 'admin' ? 0 : parseInt(dataDomain);

export default function(state=initialState, action) {

  switch(action.type) {
    case SELECT_LIST:
      return action.payload.selectedListId;

    default:
      return state;
  }
}
