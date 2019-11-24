import React, {Component} from 'react';
import "./register.css"
import {Modal} from "semantic-ui-react"

class Register extends Component{
    state={
        email:'',
        password:'',
        first_name:'',
        last_name:'',
        username:'',
        loginMessage: '',
        registrationMessage: ''
    }
    handleChange=(e)=>{
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
            })
    }

    handleCancel=()=>{
        this.setState({
            email:'',
            password:'',
            first_name:'',
            last_name:'',
            username:''
        })
        this.props.closeLoginModal()
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
        console.log(parsedResponse.status.message)

        if(parsedResponse.status.message == "Success"){
            this.props.doUpdateCurrentUser(parsedResponse)
            this.setState({
                registrationMessage: ''
            })
        }
        else {
            this.setState({
                registrationMessage: 'Email has already been register'
            })
        }

    }
    handleLogin = async (e) => {
        e.preventDefault()
        const loginResponse = await fetch (`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type':'application/json'
            }
        })

        const parsedResponse = await loginResponse.json()
        if(parsedResponse.status.message === "success"){
            this.props.doUpdateCurrentUser(parsedResponse)
            this.setState({
                loginMessage: ''
            })
        }
        else{
            this.setState({
                loginMessage: 'Email or Password Incorrect'
            })
        }
    }
    render(){
        return(
            <div id="login-container">
                <div id="login-layer">
                    <div id="cancel-login-row" onClick={this.handleCancel}>
                        <div id="cancel-x">
                            X
                        </div>
                    </div>
                    <div id="login-side">
                        <h1 id="login-header">Log In</h1>
                        <form id="login-form" onSubmit={this.handleLogin}>
                            Email: <input type= 'text' name='email' onChange={this.handleChange}/><br/>
                            Password: <input type= 'text' name='password' onChange={this.handleChange}/><br/>
                            <button id="register-button" type="submit" >Submit</button>
                            <br/>{this.state.loginMessage}
                        </form>
                    </div>
                    <div id="register-side">
                        <h1 id="register-header">Register</h1>
                        <form id="register-form" onSubmit= {this.handleSubmit}>
                            {this.state.registrationMessage}<br/>
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