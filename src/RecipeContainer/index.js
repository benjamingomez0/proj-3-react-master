import React, { Component } from 'react'
import RecipeList from '../RecipeList'
import RecipeShow from '../RecipeShow'
import RecipeEdit from '../RecipeEdit'
import {PulseLoader} from "react-spinners"

class RecipeContainer extends Component{
    state={
        recipes:[],
        recipeToEdit: {
            recipeName: "",
            ingredient1: "",
            ingredient1Amount: "",
            ingredientId1:"",
            ingredient2: "",
            ingredient2Amount: "",
            ingredientId2:"",
            ingredient3: "",
            ingredient3Amount: "",
            ingredientId3:"",
            cal: 0,
            servings: 1,
            directions: "",
            id: ""
        },
        showEditModal: false
      }
    
    componentDidMount(){
        this.getRecipes()
    }
    getRecipes= async () =>{
        try{
        const recipes = await fetch(`${process.env.REACT_APP_API_URL}/recipes/`);
        const parsedRecipes = await recipes.json()
        this.setState({
            recipes:
            parsedRecipes.data
        })
        }
        catch(err)
        {
            console.log(err)
        }
    }
    openAndEdit = recipeFromTheList => {
        this.setState({
            showEditModal: true,
            recipeToEdit: {
                ...recipeFromTheList
            }
        });
    }
    handleEditChange = (e) => {
        this.setState({
            recipeToEdit: {
                ...this.state.recipeToEdit,
                [e.currentTarget.name]: e.currentTarget.value
            }
        });
    }
    closeAndEdit = async (e) => {
        console.log('hit')
        e.preventDefault();
        try {
            const editResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/recipes/${this.state.recipeToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.recipeToEdit),
                headers: {
                  'Content-Type': 'application/json'
                } 
            })
            const editResponseParsed = await editResponse.json()
            console.log(editResponseParsed, 'this is edit response')
            const newRecipeArrayWithEdit = this.state.recipes.map(recipe => {
                if(recipe.id === editResponseParsed.data.id) {
                    recipe = editResponseParsed.data
                }
                return recipe
            });
            this.setState({
                showEditModal: false,
                recipes: newRecipeArrayWithEdit
              });
        }catch(err) {
            console.log(err, 'this is error edit')
        }
    }

    render(){
    return(
        <>
        <RecipeList recipes = {this.state.recipes}/>
        <RecipeShow />
        <RecipeEdit />
        </>
    )
    }
}

export default RecipeContainer