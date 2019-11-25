import React from 'react'
import { Link } from  'react-router-dom'
import "./recipeList.css"
import ReactImageFallback from "react-image-fallback";

const RecipeList=(props)=>{
    const recipes= props.recipes.map((recipe)=>{
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
        <div id="recipe-list-container">
            <div className="welcome-row">
                <div className="welcome-header">
                    Hattrick
                </div>
                <div className="welcome-message">
                    Welcome to Hattrick, the go-to site for the best 3-ingredient recipes. Explore our library of recipes created by cooks around the world. Create your own hattrick recipes by logging in or creating an account.
                </div>
            </div>
            <div className="recipe-list-row">
                {recipes}
            </div>
        </div>
    )
}

export default RecipeList