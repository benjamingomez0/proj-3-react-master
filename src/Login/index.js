import React, { Component } from 'react'

class Login extends Component {
    state={
        email:'',
        password:'',
    }

    handleChange=(e)=>{
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
            })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        console.log("hitting")
        const loginResponse = await fetch (`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const parsedResponse = await loginResponse.json()
        console.log(parsedResponse)
        console.log(loginResponse)
        // if(parsedResponse.status.message === "Success"){
        //     console.log("logged in")
        // }
        // else{
        //     console.log("not logged in")
        // }
    }

    render(){
        return(
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    Email: <input type= 'text' name='email' onChange={this.handleChange}/><br/>
                    Password: <input type= 'text' name='password' onChange={this.handleChange}/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login