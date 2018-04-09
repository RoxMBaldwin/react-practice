import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {messages: []}
  // }

  render() {
    return (
      <div className="container">
        <header>
          <nav>
            <h3>toolbar</h3>
          </nav>
        </header>
        <main>
          <h1>messages</h1>
        </main>
      </div>
    );
  }
}

export default App;
