import React, {Component} from 'react'

class RecipeShow extends Component{
    state={
        recipe:{
        }
    }

    async componentDidMount(){
    const recipeId=2
     const reqRecipie = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
     const parsedRecipe = await reqRecipie.json()
     console.log(parsedRecipe)
     this.setState({recipe:parsedRecipe.data})

    }
    render(){
        return(
            <div>
            hitting    
            </div>
        )
    }

}

export default RecipeShow