import React, { Component } from 'react'
import NewRecipe from "./NewRecipe"
import './App.css';
import Register from './Register'

import NavBar from "./Nav"



class App extends Component {
  state = {
    currentUser:{
      id:'',
      first_name:'',
      last_name:'',
      username:''
    }
  }

  doUpdateCurrentUser=user=>{
    this.setState({
      currentUser : user
    })
  }
  render(){
    return (
      <div className="App">
        <Register doUpdateCurrentUser = {this.doUpdateCurrentUser}/>
        {/* <NavBar />
        <NewRecipe />    */}

      </div>
    )
  }
}

export default App;