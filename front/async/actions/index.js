import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const ADD_POST = 'ADD_POST'

export function addPostTest(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function addPost(post) {
  return dispatch => {
    return fetch('http://default:4000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: {title: post}})
    })
      .then(response => response.json())
      .then(json => dispatch(addPostTest(json)));
  };
}


export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
    reddit,
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`http://default:4000/api/v1/posts`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}
