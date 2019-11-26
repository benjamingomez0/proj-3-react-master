import React, { Component } from 'react'
import "./newRecipe.css"
import {PulseLoader} from "react-spinners"
import { withRouter } from 'react-router-dom'
class NewRecipe extends Component{
    state = {
        recipeName: "",
        ingredient1: "",
        ingredient1Amount: 0,
        ingredientId1:"",
        ingredient2: "",
        ingredient2Amount: 0,
        ingredientId2:"",
        ingredient3: "",
        ingredient3Amount: 0,
        ingredientId3:"",
        cal: 0,
        servings: 1,
        directions: "",
        imgURL: "",
        error1: "",
        error2: "",
        error3: "",
        loading: false,
    }

    handleChange = (e) => {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value
      })
      if(this.state.recipeName === ""){
        this.setState({
          recipeName: `${this.props.user.first_name}'s Recipe`
        })
      }
      if(this.state.ingredient1 === ""){
        this.setState({
          ingredient1: " "
        })
      }
      if(this.state.ingredient2 === ""){
        this.setState({
          ingredient2: " "
        })
      }
      if(this.state.ingredient3 === ""){
        this.setState({
          ingredient3: " "
        })
      }
    }


    getNutrition = async (e) => {
        try{
            this.setState({
              loading: true,
              error1: "",
              error2: "",
              error3: ""
            })
            e.preventDefault()
            //FOOD DATABASE IS BASED ON PER 100G
            const queryIng1 = this.state.ingredient1
            const queryIng2 = this.state.ingredient2
            const queryIng3 = this.state.ingredient3
            console.log(queryIng1)
            console.log(queryIng2)
            console.log(queryIng3)

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
              if(this.state.ingredient1 === " "){
                console.log("pass")
              }
              else if (parsedIng1.parsed.length === 0){
                  this.setState({
                    error1: "Ingredient 1 not found. Please try again."
                })
              }
              if(this.state.ingredient2 === " "){
                console.log("pass")
              }
              else if(parsedIng2.parsed.length === 0){
                  this.setState({
                    error2: "Ingredient 2 not found. Please try again."
                })
              }
              if(this.state.ingredient3 === " "){
                console.log("pass")
              }
              else if(parsedIng3.parsed.length === 0){
                this.setState({
                  error3: "Ingredient 3 not found. Please try again."
                })
              }
              if(this.state.error1 !== "" || this.state.error2 !== "" || this.state.error3 !== ""){
                this.setState({
                  loading: false
                })
                return this.setState({
                  loading: false
                })
              }
            }
            if(parsedIng1.error || parsedIng1.parsed.length === 0 || !parsedIng1.parsed[0].food.nutrients.ENERC_KCAL){
              ing1Cal = 0
            }
            else {
              ing1Cal = parsedIng1.parsed[0].food.nutrients.ENERC_KCAL
              this.setState({
                error1: "",
                ingredientId1: parsedIng1.parsed[0].food.foodId,
              })
            }
            if(parsedIng2.error || parsedIng2.parsed.length === 0 || !parsedIng2.parsed[0].food.nutrients.ENERC_KCAL){
              ing2Cal = 0
            }
            else {
              ing2Cal = parsedIng2.parsed[0].food.nutrients.ENERC_KCAL
              this.setState({
                error2: "",
                ingredientId2: parsedIng2.parsed[0].food.foodId,
              })
            }
            if(parsedIng3.error || parsedIng3.parsed.length === 0 || !parsedIng3.parsed[0].food.nutrients.ENERC_KCAL){
              ing3Cal = 0
            }
            else {
              ing3Cal = parsedIng3.parsed[0].food.nutrients.ENERC_KCAL
              this.setState({
                error3: "",
                ingredientId3: parsedIng3.parsed[0].food.foodId,
              })
            }
            this.setState(
              {
              cal: ((((
                (ing1Cal*this.state.ingredient1Amount*28.3495/100)
                + (ing2Cal*this.state.ingredient2Amount*28.3495/100) 
                + (ing3Cal*this.state.ingredient3Amount*28.3495/100)))/this.state.servings).toFixed(2)),
              loading: false
            })
            this.setState({
              UserId: this.props.user.id
            })
              const newRecipeResponse = await fetch (`${process.env.REACT_APP_API_URL}/recipes/`, {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                  "Content-Type": "application/json"
                }
              })
              const parsedResponse = await newRecipeResponse.json()
            this.props.history.push(`/user/${this.props.UserId}`)
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
                <form id="new-recipe-form" onSubmit={this.getNutrition}>
                    Recipe Name: <input type="text" name="recipeName" onChange={this.handleChange} placeholder={`${this.props.user.first_name}'s Recipe`}/><br/>
                    Ingredient 1: <input type="text" name="ingredient1" onChange={this.handleChange} required/>
                    <input placeholder="Ounces" type="number" min="0" name="ingredient1Amount" onChange={this.handleChange}/><br/>
                    Ingredient 2: <input type="text" name="ingredient2" onChange={this.handleChange}/>
                    <input placeholder="Ounces" type="number" min="0" name="ingredient2Amount" onChange={this.handleChange}/><br/>
                    Ingredient 3: <input type="text" name="ingredient3" onChange={this.handleChange}/>
                    <input placeholder="Ounces" type="number" min="0" name="ingredient3Amount" onChange={this.handleChange}/><br/>
                    Servings: <input type="number" min="1" name="servings" onChange={this.handleChange} value={this.state.servings} required/><br/>
                    Recipe Image URL: <input type="text" name="imgURL" onChange={this.handleChange}/>
                    <textarea placeholder="Tell us how to cook your dish!" type="text" name="directions" rows="10" onChange={this.handleChange}/><br/>
                    <div id="cal-total">
                      Calories Per Serving: {this.state.cal}
                    </div>
                    <div className="loader">
                      <PulseLoader sizeUnit={"px"} size={15} color={"rgb(68, 177, 250)"} loading={this.state.loading}/>
                    </div>
                    <div className="error">{this.state.error1}</div>
                    <div className="error">{this.state.error2}</div>
                    <div className="error">{this.state.error3}</div>
                    {
                      (
                        (
                          (
                            (this.state.ingredient1 !== "" && this.state.ingredient1 !== " ") && (this.state.ingredient1Amount === 0 || this.state.ingredient1Amount === "")
                          ) 
                            || 
                          (
                            (this.state.ingredient2 !== "" && this.state.ingredient2 !== " ") && (this.state.ingredient2Amount === 0 || this.state.ingredient2Amount === "")
                          ) 
                            ||
                          (
                            (this.state.ingredient3 !== "" && this.state.ingredient3 !== " ") && (this.state.ingredient3Amount === 0 || this.state.ingredient3Amount === "")
                          )
                      )
                        ||
                          ((this.state.ingredient1 === "" || this.state.ingredient1 === " ") && (this.state.ingredient2 === "" || this.state.ingredient2 === " ") && (this.state.ingredient3 === "" || this.state.ingredient3 === " "))
                      )
                      ?
                      <>
                      <button id="new-recipe-button" type="submit" disabled>Ensure ingredients have amounts.</button><br/>
                      </>
                      :
                      <>
                      <button id="new-recipe-button" type="submit">Hattrick!</button><br/>
                      </>
                    }
                </form>
                </div>
            </div>
        )
    }
}
export default withRouter(NewRecipe)