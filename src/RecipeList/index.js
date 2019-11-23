import React from 'react'
import { Link } from  'react-router-dom'
import "./recipeList.css"


const RecipeList=(props)=>{
    const recipes= props.recipes.map((recipe)=>{
        return(
            <Link to={`/recipes/${recipe.id}`} className="recipe-list-col" key = {recipe.id}>
                <img className="recipe-image" src={recipe.imgURL}/>
                <div className="lower-card">
                    <h2 class="recipe-name">{recipe.recipeName}</h2>
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