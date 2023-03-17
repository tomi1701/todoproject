import React, { useState, useEffect } from 'react'
import './App.css';
//importing components
import Form from "./components/Form"
import ToDoList from './components/ToDoList'
import Kitty from './kitty.png'
import Poster from './poster.png'

function App() {

  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  //useEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])
  
  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break; 
      case'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]))
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Tomi's To-Do List</h1>
      </header>
      {/* <img src={Kitty} className="Kitty" /> */}
      <Form 
            inputText = {inputText}
            todos = {todos} 
            setTodos = {setTodos} 
            setInputText = {setInputText}
            setStatus = {setStatus}
      />
      <ToDoList 
            setTodos = {setTodos}
            todos = {todos}
            filteredTodos = {filteredTodos}

      />
      
    </div>
  );
}

export default App;
