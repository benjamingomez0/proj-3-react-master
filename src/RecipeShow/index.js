import React, {Component} from "react"
class RecipeShow extends Component{
    state={
        recipe:{
        }
    }
    async componentDidMount(){
    const recipeId=1
     const reqRecipie = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
     const parsedRecipe = await reqRecipie.json()
     console.log(parsedRecipe)
     this.setState({recipe:parsedRecipe.data})
    }
    render(){
        return(
            <div>
            <h1>{this.state.recipe.recipeName}</h1>
            <ul>
            <li>{this.state.recipe.ingredient1}:                    {this.state.recipe.ingredient1Amount}</li>
            <li>{this.state.recipe.ingredient2}:                    {this.state.recipe.ingredient2Amount}</li>
            <li>{this.state.recipe.ingredient3}:                    {this.state.recipe.ingredient3Amount}</li>
            </ul>
            <button onClick ={()=>{this.props.openAndEdit(this.state.recipe)}}>Edit</button>
            </div>
        )
    }
}
export default RecipeShow