import React, { Component } from 'react'
import "./showUser.css"

class UserShow extends Component {
    state = {
        user: {},
        userRecipes: {}
    }
    async componentDidMount(){
        // console.log(this.props.match.params.id)
        // const userId = this.props.match.params.id
        const userId = this.props.user.id
        const reqUser = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`)
        // const reqUserRecipes = await fetch (`${process.env.REACT_APP_API_URL}/recipes`)
        const parsedUser = await reqUser.json()
        // const parsedUserRecipes = await reqUserRecipes.json()
        console.log(parsedUser)
        // console.log(parsedUserRecipes)
        this.setState({
            user: parsedUser.data,
            // userRecipes: parsedUserRecipes.data
        })
    }
    render(){
        return(
            <div id="show-user-container">
                <div id="welcome-row">
                    <h1 id="welcome-message">Hello, {this.props.user.first_name}</h1>
                </div>
                <div id="your-recipes-row">
                    Your Recipes:
                </div>
                <div id="user-recipes-container">
                    <div id="user-recipes-row">
                        <div id="user-recipes-col">
                         show page for recipe here
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserShow