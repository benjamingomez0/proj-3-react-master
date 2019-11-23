import React, { Component } from 'react'
import RecipeList from '../RecipeList'
import { withRouter } from 'react-router-dom'


class RecipeContainer extends Component{
    state={
        recipes:[],

        userRecipes:[],
        
        showEditModal: false
      }
    
 
     
    componentDidMount(){
        this.getRecipes()
    }
    getRecipes= async () =>{
        try{
        const recipes = await fetch(`${process.env.REACT_APP_API_URL}/recipes/`);
        const parsedRecipes = await recipes.json()
        console.log(parsedRecipes.data)
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
    
    deleteRecipe = async (id) => {
        const deleteRecipeResponse = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`, {
            method: 'DELETE'
        });
        await deleteRecipeResponse.json();
        this.setState({recipes: this.state.recipes.filter((recipe) => recipe.id !== id )})
    }
    getNutrition = async () => {
        try{
            //FOOD DATABASE IS BASED ON PER 100G
            const queryIng1 = this.state.recipeToEdit.ingredient1
            const queryIng2 = this.state.recipeToEdit.ingredient2
            const queryIng3 = this.state.recipeToEdit.ingredient3
            console.log('pre-fetch')
            const ing1 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng1}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
            const ing2 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng2}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
            const ing3 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng3}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
            console.log('post-fetch')
            const parsedIng1 = await ing1.json()
            const parsedIng2 = await ing2.json()
            const parsedIng3 = await ing3.json()
          
            let ing1Cal
            let ing2Cal
            let ing3Cal
            if(parsedIng1.error || parsedIng1.parsed.length === 0){
              ing1Cal = 0
              this.setState({
                recipeToEdit:{...this.state.recipeToEdit, ingredient1:''}
              })
            }
            else {
              ing1Cal = parsedIng1.parsed[0].food.nutrients.ENERC_KCAL
              this.setState({
                recipeToEdit:{...this.state.recipeToEdit, ingredientId1: parsedIng1.parsed[0].food.foodId}
              })
            }

            if(parsedIng2.error || parsedIng2.parsed.length === 0){
              ing2Cal = 0
              this.setState({
                
                recipeToEdit:{...this.state.recipeToEdit, ingredient2:''}
              })
            }
            else {
                ing2Cal = parsedIng2.parsed[0].food.nutrients.ENERC_KCAL
                this.setState({
                  recipeToEdit:{...this.state.recipeToEdit, ingredientId2: parsedIng2.parsed[0].food.foodId}
                })
            }
            if(parsedIng3.error || parsedIng3.parsed.length === 0){
              ing3Cal = 0
              this.setState({
               
                recipeToEdit:{...this.state.recipeToEdit, ingredient3:''}
              })
            }
            else {
                ing3Cal = parsedIng3.parsed[0].food.nutrients.ENERC_KCAL
                this.setState({
                  recipeToEdit:{...this.state.recipeToEdit, ingredientId3: parsedIng3.parsed[0].food.foodId}
                })
            }
            this.setState(
                {
                    recipeToEdit:{...this.state.recipeToEdit, cal: ((((
                    (ing1Cal*this.state.recipeToEdit.ingredient1Amount*28.3495/100)
                    + (ing2Cal*this.state.recipeToEdit.ingredient2Amount*28.3495/100) 
                    + (ing3Cal*this.state.recipeToEdit.ingredient3Amount*28.3495/100)))/this.state.recipeToEdit.servings).toFixed(2))
                }})
            console.log("End")
          }
        catch(err){
          console.log(err)
        }
       
      }

    render(){
    return(
        <div>
          <RecipeList recipes = {this.state.recipes}/>
        </div>
    )
    }
}
export default withRouter(RecipeContainer)