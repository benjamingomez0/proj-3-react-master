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
            <div id="avatar-row">
                {
                    props.user.avatar === "" ? <img className="avatar-img" id="avatar" src="https://images.unsplash.com/photo-1549370699-e8c493402b69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60"/>
                    :
                    props.user.avatar === "vegetables" ? <img className="avatar-img" id="vegetables" src="https://images.unsplash.com/photo-1522184216316-3c25379f9760?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                    :
                    props.user.avatar === "meats" ? <img className="avatar-img" id="meats" src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/>
                    :
                    props.user.avatar === "fruits" ? <img className="avatar-img" id="fruits" src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                    :
                    null
                }
            </div>
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