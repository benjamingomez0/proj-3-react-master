import React from 'react'

function UserRecipeList(props){
    const userRecipes = props.userRecipes.map((recipe)=>{
        return(
            <div key = {recipe.id}>
                <h2>{recipe.recipeName}</h2>
                <button>View Recipe</button>
            </div>
        )
    })
    return(
        <div>
            {userRecipes}
        </div>
    )
}

export default UserRecipeList