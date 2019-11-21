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
    //remember to change input to email where appropriate
    render(){
        return(
            <div id="register-container">
                <div id="register-layer">
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
        )

    }

}

export default Register