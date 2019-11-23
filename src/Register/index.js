import React, {Component} from 'react';
import "./register.css"

class Register extends Component{
    state={
        email:'',
        password:'',
        first_name:'',
        last_name:'',
        username:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
            })
    }
    handleSubmit = async (e)=>{
        e.preventDefault();
        const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
            method:"POST",
            credentials: 'include',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
            }
        })
        
       const parsedResponse = await registerResponse.json();
       this.props.doUpdateCurrentUser(parsedResponse)

    }
    handleLogin = async (e) => {
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
        if(parsedResponse.status.message === "success"){
            console.log("logged in")
            this.props.doUpdateCurrentUser(parsedResponse)
        }
        else{
            console.log("not logged in")
        }
    }
    render(){
        return(
            <div id="login-container">
                <div id="login-layer">
                    <div id="login-side">
                        <h1 id="login-header">Log In</h1>
                        <form id="login-form" onSubmit={this.handleLogin}>
                            Email: <input type= 'text' name='email' onChange={this.handleChange}/><br/>
                            Password: <input type= 'text' name='password' onChange={this.handleChange}/><br/>
                            <button id="register-button" type="submit" >Submit</button>
                        </form>
                    </div>
                    <div id="register-side">
                        <h1 id="register-header">Register</h1>
                        <form id="register-form" onSubmit= {this.handleSubmit}>
                            Email: <input type= 'text' name='email' onChange={this.handleChange}/><br/>
                            First Name: <input type= 'text' name='first_name' onChange={this.handleChange}/><br/>
                            Last Name: <input type= 'text' name='last_name' onChange={this.handleChange}/><br/>
                            Password: <input type= 'text' name='password' onChange={this.handleChange}/><br/>
                            <button id="register-button" type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )

    }

}

export default Register