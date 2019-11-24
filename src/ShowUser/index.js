import React from 'react'
import "./showUser.css"
import { withRouter, Link } from 'react-router-dom'



function ShowUser(props){
   console.log(props)
    const userRecipes = props.recipes.filter((recipe) => recipe.UserId == props.user.id).map((recipe)=>
    {
        return(
            // <div key = {recipe.id} id="user-recipes-col"> 
            //     <h2>{recipe.recipeName}</h2>
            //     <button>View Recipe</button>
            // </div>
            <Link to={`/recipes/${recipe.id}`} className="recipe-list-col" key = {recipe.id}>
                <img className="recipe-image" src={recipe.imgURL}/>
                <div className="lower-card">
                    <h2 className="recipe-name">{recipe.recipeName}</h2>
                    <div>Calories: {recipe.cal}</div>
                </div>
            </Link>
        )
    })
    return(
        <div id="show-user-container">
          
            <div id="welcome-row">
                <h2>Hello {props.user.first_name}</h2>
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

export default withRouter(ShowUser)