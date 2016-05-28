let nextTodoId = 0
export const addTodo = (text) => {
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

// now implementing this func
export function fetchTodos() {
  return dispatch => {
   //dispatch(setLoading()); // Show a loading spinner
    fetch(`http://default:4000/api/v1/todos`, (response) => {
     //dispatch(doneFetching()); // Hide loading spinner
      if(response.status == 200){
        dispatch(todos(response.json, 'ADD_TODO')); // Use a normal function to set the received state
      }else {
        // dispatch()
      }
    })
  }
}
