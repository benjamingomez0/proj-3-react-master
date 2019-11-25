import React, {Component} from "react"
import RecipeEdit from '../RecipeEdit'
import { withRouter, Link } from 'react-router-dom'
import "./recipeShow.css"

class RecipeShow extends Component{
    state={
        recipe:{
        },
        show: false,
        loading: false,
        error1: "",
        error2: "",
        error3: ""

    }
    async componentDidMount(){
      
    const recipeId = this.props.match.params.id

     const reqRecipe = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
     const parsedRecipe = await reqRecipe.json()
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
        if(this.state.error1 !== "" || this.state.error2 !== "" || this.state.error3 !== ""){
          return
        }
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

        }catch(err) {
            console.log(err, 'error in editing the requested resource')
        }
    }
    deleteRecipe = async (id) => {
        
        const deleteRecipeResponse = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`, {
            method: 'DELETE'
        });
        const deleted = await deleteRecipeResponse.json();
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
            const ing1 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng1}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
            const ing2 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng2}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
            const ing3 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng3}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
            const parsedIng1 = await ing1.json()
            const parsedIng2 = await ing2.json()
            const parsedIng3 = await ing3.json()
          
            let ing1Cal
            let ing2Cal
            let ing3Cal

            if(parsedIng1.parsed.length === 0 || parsedIng2.parsed.length === 0 || parsedIng3.parsed.length === 0 ){
              if(parsedIng1.parsed.length === 0){
                  this.setState({
                    error1: "Ingredient 1 not found. Please try again.",
                    loading: false
                })
              }
              if(parsedIng2.parsed.length === 0){
                  this.setState({
                    error2: "Ingredient 2 not found. Please try again.",
                    loading: false
                })
              }
              if(parsedIng3.parsed.length === 0){
                this.setState({
                  error3: "Ingredient 3 not found. Please try again.",
                  loading: false
                })
              }
              console.log("about to return")
              return
            }
            console.log("didnt return")

            if(parsedIng1.error || parsedIng1.parsed.length === 0 || !parsedIng1.parsed[0].food.nutrients.ENERC_KCAL){
              ing1Cal = 0
            }
            else {
              ing1Cal = parsedIng1.parsed[0].food.nutrients.ENERC_KCAL
              this.setState({
                recipe:{...this.state.recipe, ingredientId1: parsedIng1.parsed[0].food.foodId},
                error1: ""
              })
            }

            if(parsedIng2.error || parsedIng2.parsed.length === 0 || !parsedIng2.parsed[0].food.nutrients.ENERC_KCAL){
              ing2Cal = 0
            }
            else {
                ing2Cal = parsedIng2.parsed[0].food.nutrients.ENERC_KCAL
                this.setState({
                  recipe:{...this.state.recipe, ingredientId2: parsedIng2.parsed[0].food.foodId},
                  error2: ""
                })
            }
            if(parsedIng3.error || parsedIng3.parsed.length === 0 || !parsedIng3.parsed[0].food.nutrients.ENERC_KCAL){
              ing3Cal = 0
            }
            else {
                ing3Cal = parsedIng3.parsed[0].food.nutrients.ENERC_KCAL
                this.setState({
                  recipe:{...this.state.recipe, ingredientId3: parsedIng3.parsed[0].food.foodId},
                  error3: ""
                })
            }
            this.setState(
                {
                    recipe:{...this.state.recipe, cal: ((((
                    (ing1Cal*this.state.recipe.ingredient1Amount*28.3495/100)
                    + (ing2Cal*this.state.recipe.ingredient2Amount*28.3495/100) 
                    + (ing3Cal*this.state.recipe.ingredient3Amount*28.3495/100)))/this.state.recipe.servings).toFixed(2))
                }})
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
                <span className="heading-color">Serves</span> <br/> {this.state.recipe.servings}
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-cal-col">
                <span className="heading-color">Calories Per Serving</span><br/> {this.state.recipe.cal}
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-ingredients-col">
                <span className="heading-color">Ingredients</span> <br/>
                  {
                    this.state.recipe.ingredient1 !== ""
                    ?
                    <>
                    <b>{this.state.recipe.ingredient1}</b> ({this.state.recipe.ingredient1Amount} oz.)<br/>
                    </>
                    :
                    null
                  }
                  {
                    this.state.recipe.ingredient2 !== ""
                    ?
                    <>
                    <b>{this.state.recipe.ingredient2}</b> ({this.state.recipe.ingredient2Amount} oz.)<br/>
                    </>
                    :
                    null
                  }
                  {
                    this.state.recipe.ingredient3 !== ""
                    ?
                    <>
                    <b>{this.state.recipe.ingredient3}</b> ({this.state.recipe.ingredient3Amount} oz.)
                    </>
                    :
                    null
                  }
                </div>
              </div>
              <div className="recipe-show-row">
                <div className="recipe-show-col" id="recipe-show-directions-col">
                  <span className="heading-color">Directions</span><br/> {this.state.recipe.directions}
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
                <RecipeEdit  handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit} recipeToEdit={this.state.recipe} getNutrition={this.props.getNutrition} deleteRecipe={this.deleteRecipe} loading={this.state.loading} mount={this.componentDidMount} match={this.props.match.params.id} error1={this.state.error1} error2={this.state.error2} error3={this.state.error3}/>
            </div>
          </>
        )
    }
}
export default withRouter(RecipeShow)