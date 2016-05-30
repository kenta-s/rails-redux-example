let nextTodoId = 0
export const addTodoTest = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

// export function fetchTodos() {
//   return dispatch => {
//     return fetch('http://default:4000/api/v1/todos')
//       .then(response => response.json())
//       .then(json => dispatch(addTodo(json[0]["name"])));
//   };
// }

export function addTodo(text) {
  return dispatch => {
    return fetch('http://default:4000/api/v1/todos', {
      method: 'POST',
      body: JSON.stringify({todo: {name: "text", status: "active"}})
    })
      .then(response => response.json())
      .then(json => dispatch(addTodoTest(json[0]["name"])));
  };
}
// export function toggleTodo(id) {
//   return dispatch => {
//     return fetch('http://default:4000/api/v1/todo/' + id, {
//       method: 'PATCH',
//       body: new FormData({todo: {status: "completed"}})})
//       .then(response => response.json())
//       .then(json => dispatch(addTodo(json[0]["name"])));
//   };
// }
