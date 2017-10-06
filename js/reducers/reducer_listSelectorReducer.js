import { toJS, fromJS, List, sort } from 'immutable';

const listOfLists = [
  { name: 'activities',
    id: 0,
    list: [
      { id: 0, value: 'films', votes:5 },
      { id: 1, value: 'books', votes:4 },
      { id: 2, value: 'courses', votes:3 },
      { id: 3, value: 'walking', votes:2 }
  ]},
  { name: 'foods',
    id: 1,
    list: [
    { id: 0, value: 'thai', votes:10 },
    { id: 1, value: 'indian', votes:4 },
    { id: 2, value: 'greek', votes:1 },
    { id: 3, value: 'italian', votes:0 }
  ]},
  { name: 'sports',
    id: 2,
    list: [
    { id: 0, value: 'climbing', votes:100 },
    { id: 1, value: 'surfing', votes:100 },
    { id: 2, value: 'football', votes:1 },
    { id: 3, value: 'croquet', votes:0 }
  ]}
]

export default function(state=listOfLists, action) {

  return state;
}
