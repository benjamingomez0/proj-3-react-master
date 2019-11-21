import React, { Component } from 'react'
import NewRecipe from "./NewRecipe"
import './App.css';
import Register from './Register'
import UserShow from "./User"
import NavBar from "./Nav"
import Login from "./Login"

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
        <NavBar />
        <Login doUpdateCurrentUser={this.doUpdateCurrentUser}/>
        {/* <NewRecipe />    */}
        {/* <UserShow user={this.state.currentUser}/> */}
        <Register doUpdateCurrentUser = {this.doUpdateCurrentUser}/>   
      </div>
    )
  }
}

export default App;