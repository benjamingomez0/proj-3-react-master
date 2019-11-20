import React, { Component } from 'react'
// import {Button, Form} from "semantic-ui-react"
import "./newRecipe.css"

class NewRecipe extends Component{
    state = {
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
        servings: 0,
        directions: "",
        error1: "",
        error2: "",
        error3: ""
    }

    handleChange = (e) => {
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
      }

    getNutrition = async (e) => {
        try{
          console.log("this is hitting")
          e.preventDefault()
          //FOOD DATABASE IS BASED ON PER 100G
          const queryIng1 = this.state.ingredient1
          const queryIng2 = this.state.ingredient2
          const queryIng3 = this.state.ingredient3
          const ing1 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng1}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          console.log(`https://api.edamam.com/api/food-database/parser?ingr=${queryIng1}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`, "this is query 1")
          const ing2 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng2}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          const ing3 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng3}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
      
          const parsedIng1 = await ing1.json()
          const parsedIng2 = await ing2.json()
          const parsedIng3 = await ing3.json()
          console.log(parsedIng1)
          console.log(parsedIng2)
          console.log(parsedIng3)
          let ing1Cal
          let ing2Cal
          let ing3Cal
          if(parsedIng1.error || parsedIng1.parsed.length === 0){
            ing1Cal = 0
            this.setState({
              error1: "Ingredient 1 not calculated. Please try a different search if you want to include it.",
              ingredientId1: ""
            })
          }
          else {
            ing1Cal = parsedIng1.parsed[0].food.nutrients.ENERC_KCAL
            this.setState({
              error1: "",
              ingredientId1: parsedIng1.parsed[0].food.foodId,
            })
          }

          if(parsedIng2.error || parsedIng2.parsed.length === 0){
            ing2Cal = 0
            this.setState({
              error2: "Ingredient 2 not calculated. Please try a different search if you want to include it.",
              ingredientId2: ""
            })
          }
          else {
            ing2Cal = parsedIng2.parsed[0].food.nutrients.ENERC_KCAL
            this.setState({
              error2: "",
              ingredientId2: parsedIng2.parsed[0].food.foodId,
            })
          }

          if(parsedIng3.error || parsedIng3.parsed.length === 0){
            ing3Cal = 0
            this.setState({
              error3: "Ingredient 3 not calculated. Please try a different search if you want to include it.",
              ingredientId3: ""
            })
          }
          else {
            ing3Cal = parsedIng3.parsed[0].food.nutrients.ENERC_KCAL
            this.setState({
              error3: "",
              ingredientId3: parsedIng3.parsed[0].food.foodId,
            })
          }
          console.log(parsedIng1.parsed[0].food.foodId)
          this.setState(
            {
            cal: (((
              (ing1Cal*this.state.ingredient1Amount*28.3495/100)
              + (ing2Cal*this.state.ingredient2Amount*28.3495/100) 
              + (ing3Cal*this.state.ingredient3Amount*28.3495/100)))/this.state.servings.toFixed(2)),
          })
        }
        catch(err){
          console.log(err)
        }
      }

    render(){
        return(
            <div id="new-recipe-container">
              <div id="new-recipe-background-layer">
                <h1 id="new-recipe-header">Create Your Hattrick</h1>
                <form>
                    Recipe Name: <input type="text" name="recipeName" onChange={this.handleChange}/><br/>
                    Ingredient 1: <input type="text" name="ingredient1" onChange={this.handleChange}/>
                    <input placeholder="Ounces" type="number" min="0" name="ingredient1Amount" onChange={this.handleChange}/><br/>
                    Ingredient 2: <input type="text" name="ingredient2" onChange={this.handleChange}/>
                    <input placeholder="Ounces" type="number" min="0" name="ingredient2Amount" onChange={this.handleChange}/><br/>
                    Ingredient 3: <input type="text" name="ingredient3" onChange={this.handleChange}/>
                    <input placeholder="Ounces" type="number" min="0" name="ingredient3Amount" onChange={this.handleChange}/><br/>
                    Servings: <input type="number" min="0" name="servings" onChange={this.handleChange}/><br/>
                    <textarea placeholder="Tell us how to cook your dish!" type="text" name="directions" cols="100" rows="10" onChange={this.handleChange}/><br/>
                    <div id="cal-total">
                      Calories Per Serving: {this.state.cal}
                    </div>
                    <button onClick={this.getNutrition}>Hattrick!</button><br/>
                </form>
                  <div className="error">{this.state.error1}</div>
                  <div className="error">{this.state.error2}</div>
                  <div className="error">{this.state.error3}</div>
                </div>
            </div>
        )
    }
}


export default NewRecipe