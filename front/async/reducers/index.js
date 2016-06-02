import { combineReducers } from 'redux'
import {
  REQUEST_POSTS, RECEIVE_POSTS, ADD_POST
} from '../actions'

function preparePosts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    default:
      return state
  }
}

function posts(state = {isFetching: true, items: []}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, preparePosts(state, action))
    case ADD_POST:
      let new_state = Object.assign({}, state)
      new_state.items = [...state.items, action.post]
      return Object.assign({}, state, preparePosts(new_state, action))
    default:
      return state
  }
}

const rootReducer = combineReducers({
  posts
})

export default rootReducer
