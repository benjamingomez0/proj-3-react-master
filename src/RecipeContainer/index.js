import React, { Component } from 'react'
import RecipeList from '../RecipeList'
import RecipeShow from '../RecipeShow'
class RecipeContainer extends Component{
    state={
        recipes:[]
    }
    componentDidMount(){
        this.getRecipes()
    }
    getRecipes= async () =>{
        try{
        const recipes = await fetch(`${process.env.REACT_APP_API_URL}/recipes/`);
        const parsedRecipes = await recipes.json()
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
    render(){
    return(
        <>
        <RecipeList recipes = {this.state.recipes}/>
        <RecipeShow />
        </>
    )
    }
}

export default RecipeContainer