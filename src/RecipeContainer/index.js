import React, { Component } from 'react'
import RecipeList from '../RecipeList'
import RecipeShow from '../RecipeShow'
import RecipeEdit from '../RecipeEdit'


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
        
        e.preventDefault();
        debugger
        this.getNutrition()
        try {
            const editResponse = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${this.state.recipeToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.recipeToEdit),
                headers: {
                  'Content-Type': 'application/json'
                } 
            })
            const editResponseParsed = await editResponse.json()
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
            // console.log(parsedIng1)
            // console.log(parsedIng2)
            // console.log(parsedIng3)
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
        <RecipeShow openAndEdit={this.openAndEdit}/>
        <RecipeEdit  handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit} recipeToEdit={this.state.recipeToEdit} getNutrition={this.getNutrition}/>
        </div>
    )
    }
}

export default RecipeContainer