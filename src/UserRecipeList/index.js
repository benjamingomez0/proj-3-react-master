import React from 'react'

function UserRecipeList(props){
    const recipes= props.recipes.map((recipe)=>{
        return(
            <div key = {recipe.id}>
                <h2>{recipe.recipeName}</h2>
                <button>View Recipe</button>
            </div>
        )
    })
    return(
        recipes
    )
}

export default UserRecipeList