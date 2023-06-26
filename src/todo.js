import React, { useReducer, useState } from 'react';

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = () => {
    if (todoText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setTodoText('');
    }
  };

  const handleToggleTodo = id => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDeleteTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={todoText}
        onChange={e => setTodoText(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {state.todos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <span onClick={() => handleToggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
