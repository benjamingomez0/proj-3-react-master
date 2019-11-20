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
        cal: 0,
        error: false
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
          let ing1Cal
          let ing2Cal
          let ing3Cal
          if(parsedIng1.error || parsedIng1.parsed.length === 0){
            ing1Cal = 0
          }
          else {
            ing1Cal = parsedIng1.parsed[0].food.nutrients.ENERC_KCAL
          }

          if(parsedIng2.error || parsedIng2.parsed.length === 0){
            ing2Cal = 0
          }
          else {
            ing2Cal = parsedIng2.parsed[0].food.nutrients.ENERC_KCAL
          }

          if(parsedIng3.error || parsedIng3.parsed.length === 0){
            ing3Cal = 0
          }
          else {
            ing3Cal = parsedIng3.parsed[0].food.nutrients.ENERC_KCAL
          }

          this.setState(
            {
            cal: (
              (ing1Cal*this.state.ingredient1Amount*28.3495/100)
              + (ing2Cal*this.state.ingredient2Amount*28.3495/100) 
              + (ing3Cal*this.state.ingredient3Amount*28.3495/100)).toFixed(2)
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
                  <Button onClick={this.getNutrition}>Hattrick!</Button><br/>
                  {/* <div style={{display: "hidden"}}>Error</div> */}
                </Form>
                  Total Calories: {this.state.cal}
            </div>
        )
    }
}


export default NewRecipe