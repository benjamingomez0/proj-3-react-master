import React, { Component } from 'react'
import './App.css';

const apiKey = "385e19ba163511e02698e7299dab66fb"

const apiID = "fbe64bfb"

class App extends Component {
  state = {
    checkdb: []
  }

  getdb = async () => {
    try{
      console.log("this is hitting")
      const db = await fetch ("https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=fbe64bfb&app_key=385e19ba163511e02698e7299dab66fb")
      const parseddb = await db.json()
      console.log(parseddb)
      this.setState({
        checkdb: parseddb.hints[0].food.nutrients.ENERC_KCAL
      })
    }
    catch(err){
      console.log(err)
    }
  }

  componentDidMount(){
    this.getdb()
  }

  render(){
    return (
      <div className="App">
        Hi
      </div>
    )
  }
}

export default App;