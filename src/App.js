import React, { Component } from 'react'
import NewRecipe from "./NewRecipe"
import './App.css';
import Register from './Register'

class App extends Component {
  state = {
    currentUser:{}
  }

  doUpdateCurrentUser=user=>{
    this.setState({
      currentUser : user
    })
  }
  render(){
    return (
      <div className="App">
        {/* <NewRecipe />  */}
        <Register />
      </div>
    )
  }
}

export default App;