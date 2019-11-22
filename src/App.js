import React, { Component } from 'react'
import './App.css';
import RecipeContainer from './RecipeContainer'
import NavBar from './Nav'
// import {Route, Switch} from 'react-router-dom'

class App extends Component{
  state={
    loginModal:false,
    currentUser:{},
    
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
  render(){
    return (
        <div className="App">
          <NavBar showLoginModal={this.showLoginModal} currentUser={this.state.currentUser} doUpdateCurrentUser={this.doUpdateCurrentUser} loginModal={this.state.loginModal}/>
          <RecipeContainer doUpdateCurrentUser ={this.doUpdateCurrentUser} currentUser={this.state.currentUser}/>
        </div>
      )
    }  
  
}

export default App;