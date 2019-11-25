import React, { Component } from 'react'
import "./showUser.css"
import { withRouter, Link } from 'react-router-dom'
import ReactImageFallback from "react-image-fallback";

class ShowUser extends Component{
    state = {
        recipes: []
    }
    componentDidMount(){
        this.getRecipes()
    }

    getRecipes = async () =>{
        try{
        const recipes = await fetch(`${process.env.REACT_APP_API_URL}/recipes/`);
        const parsedRecipes = await recipes.json()
        const userRecipes = parsedRecipes.data.filter((recipe) => recipe.UserId == this.props.user.id)
        this.setState({
            recipes:
            userRecipes
        })
      
        }
        catch(err)
        {
            console.log(err)
        }
    }
    
    render(){
        const userRecipes = this.state.recipes.map((recipe)=>
    {
        return(
            <Link to={`/recipes/${recipe.id}`} className="recipe-list-col" key = {recipe.id}>
                <ReactImageFallback className="recipe-image" src={recipe.imgURL} fallbackImage="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
                <div className="lower-card">
                    <h2 className="recipe-name">{recipe.recipeName}</h2>
                    <div>Calories: {recipe.cal}</div>
                </div>
            </Link>
        )
    })

        return(
            <div id="show-user-container">
                <div id="avatar-row">
                    {
                        this.props.user.avatar === "" ? <img className="avatar-img" id="avatar" src="https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"/>
                        :
                        this.props.user.avatar === "vegetables" ? <img className="avatar-img" id="vegetables" src="https://images.unsplash.com/photo-1522184216316-3c25379f9760?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                        :
                        this.props.user.avatar === "meats" ? <img className="avatar-img" id="meats" src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/>
                        :
                        this.props.user.avatar === "fruits" ? <img className="avatar-img" id="fruits" src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                        :
                        null
                    }
                </div>
                <div id="welcome-row">
                    <h2>Hello, {this.props.user.first_name}</h2>
                </div>
                <div id="your-recipes-row">
                    Your Recipes:
                </div>
                <div id="user-recipes-container">
                    <div id="user-recipes-row">
                        {userRecipes}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ShowUser)