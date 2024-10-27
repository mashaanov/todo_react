import React from 'react';
import TodoBoxContainer from './components/TodoBoxContainer.jsx';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoBoxContainer />
    </div>
  );
};

export default App;