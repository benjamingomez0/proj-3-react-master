import React, { Component } from 'react'
import NewRecipe from "./NewRecipe"
import './App.css';
import Register from './Register'
import UserShow from "./ShowUser"
import NavBar from "./Nav"
import Login from "./Login"

import RecipeContainer from './RecipeContainer'

class App extends Component {
  state = {
    currentUser:{},
    loginModal:false
  }

  doUpdateCurrentUser=user=>{
    this.setState({
      currentUser : user.data,
      loginModal:false
    })
  }
  showLoginModal=()=>{
    this.setState({
      loginModal:true
    })
  }
  hideLoginModal=()=>{
    this.setState({
      loginModal:false
    })
  }
  
  render(){
    return (
      <div className="App">

        {/* <NavBar showLoginModal={this.showLoginModal} currentUser={this.state.currentUser}/>
        {
          this.state.loginModal?
        <Login  doUpdateCurrentUser={this.doUpdateCurrentUser}/> :null
        }

         <NewRecipe UserId={this.state.currentUser.id}/>    */}
        <UserShow user={this.state.currentUser}/>
        
        <Register doUpdateCurrentUser = {this.doUpdateCurrentUser}/>    
        
        <RecipeContainer />
      </div>
    )
  }
}

export default App;