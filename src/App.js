import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoApp from './components/ToDoApp'
import './bootstrap.css'
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoApp></ToDoApp>
      </div>
    );
  }
}
export default App;