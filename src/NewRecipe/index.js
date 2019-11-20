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
          const query1 = this.state.protein
          const query2 = this.state.vegetable
          const db1 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${query1}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          const db2 = await fetch (`https://api.edamam.com/api/food-database/parser?ingr=${query2}&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb`)
          const parseddb1 = await db1.json()
          const parseddb2 = await db2.json()
          console.log(parseddb1)
          console.log(parseddb2)
          this.setState({
            cal: parseddb1.hints[0].food.nutrients.ENERC_KCAL + parseddb2.hints[0].food.nutrients.ENERC_KCAL
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
                Vegetables: <input type="text" name="vegetable" onChange={this.handleChange}/><br/>
                <button onClick={this.getdb}>test</button><br/>
                </form>
            </div>
        )
    }
}


export default NewRecipe