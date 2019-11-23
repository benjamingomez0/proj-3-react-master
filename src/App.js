import React, { Component } from 'react'
import './App.css';
import RecipeContainer from './RecipeContainer'
import NavBar from './Nav'
import {Route, Switch} from 'react-router-dom'
import RecipeShow from './RecipeShow'
import NewRecipe from './NewRecipe';
import ShowUser from './ShowUser'
class App extends Component{
  state={
    loginModal:false,
    currentUser:{},
    recipes: []
    
  }
  componentDidMount(){
    this.getRecipes()
}
getRecipes= async () =>{
    try{
    const recipes = await fetch(`${process.env.REACT_APP_API_URL}/recipes/`);
    const parsedRecipes = await recipes.json()
    console.log(parsedRecipes.data)
    this.setState({
        recipes:
        parsedRecipes.data
    })
  
    }
    catch(err)
    {
        console.log(err)
    }
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
  logout=()=>{
    this.setState({
      currentUser:{}
    })
  }
  render(){
    return (
        <div className="App">
          <NavBar showLoginModal={this.showLoginModal} currentUser={this.state.currentUser} doUpdateCurrentUser={this.doUpdateCurrentUser} loginModal={this.state.loginModal} logout={this.logout}/>
          
          <Switch>
            <Route exact path = '/recipes/new' render={()=><NewRecipe UserId={this.state.currentUser.id}/>} />
            <Route exact path='/recipes/:id' render={() => <RecipeShow user={this.state.currentUser}/>} />
            <Route exact path= '/user/:id' render={()=><ShowUser user={this.state.currentUser} recipes={this.state.recipes}/>}/>
            <Route exact path ='/' render={()=> <RecipeContainer doUpdateCurrentUser ={this.doUpdateCurrentUser} currentUser={this.state.currentUser}/> }/>
          </Switch>
        </div>
      )
    }  
  
}

export default App;