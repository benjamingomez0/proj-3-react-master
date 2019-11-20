import React, { Component } from 'react'

class NewRecipe extends Component{
    state = {
        protein: "",
        vegetable: "",
        cal: ""
    }


    handleChange = (e) => {
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
      }

    getdb = async (e) => {
        try{
          console.log("this is hitting")
          e.preventDefault()
          //FOOD DATABASE IS BASED ON PER 100G
          const queryProtein = this.state.protein
          const queryVegetable = this.state.vegetable
          const protein = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryProtein}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          const vegetable = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${queryVegetable}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          const parsedProtein = await protein.json()
          const parsedVegetable = await vegetable.json()
          console.log(parsedProtein)
          console.log(parsedVegetable)
          this.setState({
            cal: ((parsedProtein.parsed[0].food.nutrients.ENERC_KCAL + parsedVegetable.parsed[0].food.nutrients.ENERC_KCAL)/3.5274).toFixed(2)
          })
        }
        catch(err){
          console.log(err)
        }
      }

    render(){
        return(
            <div>
                <h1>Create New Recipe</h1>
                <form>
                Protein: <input type="text" name="protein" onChange={this.handleChange}/><br/>
                Vegetable: <input type="text" name="vegetable" onChange={this.handleChange}/><br/>
                <button onClick={this.getdb}>test</button><br/>
                </form>
                Total Calories: {this.state.cal} per ounce
            </div>
        )
    }
}


export default NewRecipe