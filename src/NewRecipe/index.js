import React, { Component } from 'react'
import {Button, Form} from "semantic-ui-react"
import "."

class NewRecipe extends Component{
    state = {
        ingredient1: "",
        ingredient1Amount: "",
        ingredient2: "",
        ingredient2Amount: "",
        ingredient3: "",
        ingredient3Amount: "",
        sugar: 0,
        cal: 0
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
          const ing2 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng2}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          const ing3 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryIng3}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          const parsedIng1 = await ing1.json()
          const parsedIng2 = await ing2.json()
          const parsedIng3 = await ing3.json()
          console.log(parsedIng1)
          console.log(parsedIng2)
          console.log(parsedIng3)
          this.setState({
            cal: (
              (parsedIng1.parsed[0].food.nutrients.ENERC_KCAL*this.state.ingredient1Amount*28.3495/100)
               + (parsedIng2.parsed[0].food.nutrients.ENERC_KCAL*this.state.ingredient2Amount*28.3495/100) 
               + (parsedIng3.parsed[0].food.nutrients.ENERC_KCAL*this.state.ingredient3Amount*28.3495/100) 
               + (this.state.sugar*28.3495*387/100)).toFixed(2)
          })
        }
        catch(err){
          console.log(err)
        }
      }

    render(){
        return(
            <div>
                <h1>Create Your Hattrick</h1>
                <Form>
                    Ingredient 1: <input type="text" name="ingredient1" onChange={this.handleChange}/>
                    Amount (oz): <input type="number" name="ingredient1Amount" onChange={this.handleChange}/><br/>
                    Ingredient 2: <input type="text" name="ingredient2" onChange={this.handleChange}/>
                    Amount (oz): <input type="number" name="ingredient2Amount" onChange={this.handleChange}/><br/>
                    Ingredient 3: <input type="text" name="ingredient3" onChange={this.handleChange}/>
                    Amount (oz): <input type="number" name="ingredient3Amount" onChange={this.handleChange}/><br/>
                    Sugar Added (oz): <input type="number" name="sugar" onChange={this.handleChange}/><br/>
                  <Button onClick={this.getNutrition}>Hattrick!</Button><br/>
                </Form>
                  Total Calories: {this.state.cal}
            </div>
        )
    }
}


export default NewRecipe