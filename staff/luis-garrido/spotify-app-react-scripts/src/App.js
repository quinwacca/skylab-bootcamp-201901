import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld'
import Feedback from './components/Feedback'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HelloWorld name="Cheno" />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Feedback message="wtf" className = "feedback" />
          <Feedback message="wtf" className = "feedback--warn"/>
          <Feedback message="wtf" className = "feedback--error"/>

        </header>
      </div>
    );
  }
}

export default App;
