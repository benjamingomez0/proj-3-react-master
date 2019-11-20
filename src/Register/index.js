import React, {Component} from 'react';

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
        console.log(process.env.REACT_APP_API_URL, "<==== process env")
        const parsedResponse = await registerResponse.json();
        // if(parsedResponse.status.message==='Success')
        // {
        //     // tell app component that modal is no longer up

        //     this.props.doUpdateCurrentUser(parsedResponse.data)
            
        // }
    }
    //remember to change input to email where appropriate
    render(){
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit= {this.handleSubmit}>
                    Email: <input type= 'text' name='email' onChange={this.handleChange}/><br/>
                    First Name: <input type= 'text' name='first_name' onChange={this.handleChange}/><br/>
                    Last Name: <input type= 'text' name='last_name' onChange={this.handleChange}/><br/>
                    Password: <input type= 'text' name='password' onChange={this.handleChange}/><br/>
                    <input type='submit'/>
                </form>
            </div>
        )

    }

}

export default Register