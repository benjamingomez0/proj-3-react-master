import React, { Component } from 'react'
import NewRecipe from "./NewRecipe"
import './App.css';
import Register from './Register'

import NavBar from "./Nav"



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
        {/* <Register /> */}
        <NavBar />
        <NewRecipe />   

      </div>
    )
  }
}

export default App;