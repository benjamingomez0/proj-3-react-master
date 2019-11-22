import React from 'react'
import { Link } from  'react-router-dom'

const RecipeList=(props)=>{
    const recipes= props.recipes.map((recipe)=>{
        return(
            <div key = {recipe.id}>
                <h2>{recipe.recipeName}</h2>
                <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
            </div>
        )
    })
    return(
        recipes
    )
}

export default RecipeList