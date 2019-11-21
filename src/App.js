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
      currentUser : user.data
    })
  }
  render(){
    return (
      <div className="App">
        <Register doUpdateCurrentUser = {this.doUpdateCurrentUser}/>
        {/* <NavBar /> */}
        <NewRecipe UserId={this.state}/>   

      </div>
    )
  }
}

export default App;