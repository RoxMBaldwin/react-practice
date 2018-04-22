import React, { Component } from 'react';
import MessageList from "./components/message-list.js";
import './App.css';

const baseURL = 'https://fast-beyond-73764.herokuapp.com/api'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const data = await fetch(`${baseURL}/messages`)
    const response = await data.json()
    this.setState({messages: response._embedded.messages})
  }

  toggleStar(id) {
    let starred;
    this.state.messages.forEach(message => {
      if(message.id === id) {
        //console.log(message)
        starred = !message.starred
      }
    })
    const body = {
      "messageIds": [ id ],
      "command": "star",
      "star": starred
    }
    const settings = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    fetch(`${baseURL}/messages`, settings)
      .then(response => {
        if(response.ok) {
          const newMessages = this.state.messages.map(message => {
            if(message.id === id) {
              message.starred = !message.starred
            }
            return message;
          })
          this.setState(newMessages)
        }
      })
  }

  toggleSelected(message) {
    this.setState((prevState) => {
      let current = prevState.messages.indexOf(message)
      prevState.messages[current].selected ?
      prevState.messages[current].selected = false :
      prevState.messages[current].selected = true
    })
  }

  toggleSelectAll(selectedMessages) {
    selectedMessages < this.state.messages.length ?
      this.state.messages.forEach((message, i) => {
        this.setState(prevState => {
          prevState.messages[i].selected = true
        })
      }) :
      this.state.messages.forEach((message, i) => {
        this.setState(prevState => {
          prevState.messages[i].selected = false
        })
      })
  }


  render() {
    return (
      <div className="container">
        <header>
          <nav>
            <h3>toolbar</h3>
          </nav>
        </header>
        <main>
          <MessageList messages={this.state.messages}
          toggleStar={this.toggleStar.bind(this)}
          toggleSelected={this.toggleSelected.bind(this)}/>
        </main>
      </div>
    );
  }
}

export default App;
