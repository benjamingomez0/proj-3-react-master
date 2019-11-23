import React, {Component} from "react"
import RecipeEdit from '../RecipeEdit'
import { withRouter, Link } from 'react-router-dom'
import "./recipeShow.css"

class RecipeShow extends Component{
    state={
        recipe:{
        },
        show: false,
        loading: false
    }
    async componentDidMount(){
      
    const recipeId = this.props.match.params.id

     const reqRecipe = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
     const parsedRecipe = await reqRecipe.json()
     console.log(parsedRecipe)
     this.setState({
       recipe:parsedRecipe.data,
       show: false
      })
    }
    handleEditChange = (e) => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                [e.currentTarget.name]: e.currentTarget.value
            }
        });
    }
    closeAndEdit = async (e) => {
        
        e.preventDefault();
        await this.getNutrition()
        this.setState({
            loading: false,
            show: false
        })
        try {
            const editResponse = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${this.state.recipe.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.recipe),
                headers: {
                  'Content-Type': 'application/json'
                } 
            })
            const editResponseParsed = await editResponse.json()
            console.log(editResponseParsed, "THIS IS THE CLOSE EDIT PARSE")

        }catch(err) {
            console.log(err, 'this is error edit')
        }
    }
    deleteRecipe = async (id) => {
        
        const deleteRecipeResponse = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`, {
            method: 'DELETE'
        });
        const deleted = await deleteRecipeResponse.json();
        console.log(deleted)
        this.setState({
            recipes: {}
        })
      
        if(deleted.status.message ==='Recipe Deleted')
        {
            this.props.history.push('/')
        }
    }
    getNutrition = async () => {
        try{
            this.setState({
                loading: true
              })
            //FOOD DATABASE IS BASED ON PER 100G
            const queryIng1 = this.state.recipe.ingredient1
            const queryIng2 = this.state.recipe.ingredient2
            const queryIng3 = this.state.recipe.ingredient3
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
                recipe:{...this.state.recipe, ingredient1:''}
              })
            }
            else {
              ing1Cal = parsedIng1.parsed[0].food.nutrients.ENERC_KCAL
              this.setState({
                recipe:{...this.state.recipe, ingredientId1: parsedIng1.parsed[0].food.foodId}
              })
            }

            if(parsedIng2.error || parsedIng2.parsed.length === 0){
              ing2Cal = 0
              this.setState({
                
                recipe:{...this.state.recipe, ingredient2:''}
              })
            }
            else {
                ing2Cal = parsedIng2.parsed[0].food.nutrients.ENERC_KCAL
                this.setState({
                  recipe:{...this.state.recipe, ingredientId2: parsedIng2.parsed[0].food.foodId}
                })
            }
            if(parsedIng3.error || parsedIng3.parsed.length === 0){
              ing3Cal = 0
              this.setState({
               
                recipe:{...this.state.recipe, ingredient3:''}
              })
            }
            else {
                ing3Cal = parsedIng3.parsed[0].food.nutrients.ENERC_KCAL
                this.setState({
                  recipe:{...this.state.recipe, ingredientId3: parsedIng3.parsed[0].food.foodId}
                })
            }
            this.setState(
                {
                    recipe:{...this.state.recipe, cal: ((((
                    (ing1Cal*this.state.recipe.ingredient1Amount*28.3495/100)
                    + (ing2Cal*this.state.recipe.ingredient2Amount*28.3495/100) 
                    + (ing3Cal*this.state.recipe.ingredient3Amount*28.3495/100)))/this.state.recipe.servings).toFixed(2))
                }})
            console.log("End")
          }
        catch(err){
          console.log(err)
        }
       
      }
    render(){
        return(
          <>
            <div id="recipe-show-container" style={{'display' : this.state.show ? "none" : "block"}}>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-name-col">
                  {this.state.recipe.recipeName}
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col">
                  <img className="recipe-show-image" src={this.state.recipe.imgURL}/>
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-servings-col">
                  Servings: {this.state.recipe.servings}
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-cal-col">
                  Calories Per Serving: {this.state.recipe.cal}
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-ingredients-col">
                  Ingredients: <br/>
                  {
                    this.state.recipe.ingredient1 !== ""
                    ?
                    <>
                    {this.state.recipe.ingredient1} ({this.state.recipe.ingredient1Amount} oz.)<br/>
                    </>
                    :
                    null
                  }
                  {
                    this.state.recipe.ingredient2 !== ""
                    ?
                    <>
                    {this.state.recipe.ingredient2} ({this.state.recipe.ingredient2Amount} oz.)<br/>
                    </>
                    :
                    null
                  }
                  {
                    this.state.recipe.ingredient3 !== ""
                    ?
                    <>
                    {this.state.recipe.ingredient3} ({this.state.recipe.ingredient3Amount} oz.)
                    </>
                    :
                    null
                  }
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-directions-col">
                  Directions: {this.state.recipe.directions}
                </div>
              </div>
              {
                Number(this.props.user.id) === Number(this.state.recipe.UserId)
                ?
                <button id="edit-recipe-button" onClick ={()=>{this.setState({
                    show: !this.state.show
                })}}>Edit</button>
                :
                null
              }
            </div>
            <div style={{'display' : this.state.show ? "block" : "none"}} >
                <RecipeEdit  handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit} recipeToEdit={this.state.recipe} getNutrition={this.props.getNutrition} deleteRecipe={this.deleteRecipe} loading={this.state.loading} mount={this.componentDidMount} match={this.props.match.params.id}/>
            </div>
          </>
        )
    }
}
export default withRouter(RecipeShow)