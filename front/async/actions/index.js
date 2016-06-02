import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'

export function addPostForReducer(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function addPost(post) {
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: {title: post}})
    })
      .then(response => response.json())
      .then(json => dispatch(addPostForReducer(json)));
  };
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(`http://localhost:3000/api/v1/posts`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchPosts(state) {
  const posts = state
  if (!posts.items) {
    return true
  }
  if (posts.isFetching) {
    return false
  }else{
    return true
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    }
  }
}
