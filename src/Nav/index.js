import React, {Component} from 'react'
import Register from '../Register'
import Login from '../Login'
import { Link } from 'react-router-dom'
import "./nav.css"

class NavBar extends Component{
    render(){
        return(
            <>
            <div className="nav-row">
                <div className="nav-col">
                    <a className="nav-anchor" href="#">Home</a>
                </div>
                <div className="nav-col">
                   <Link to={'/recipes/new'}>Create Recipe</Link>
                </div>
                <div className="nav-col">
                    <a className="nav-anchor" href="#">Explore</a>
                </div>
                <div className="nav-col">
                        {

                        this.props.currentUser.email?
                        <>
                        <span>Hello, {this.props.currentUser.first_name}</span>
                        <a className="nav-anchor" href="#" onClick={this.props.logout}> Logout</a>
                        </>:
                        <button  onClick ={this.props.showLoginModal}>Login/Register</button>

                        }
                </div>
            </div>
            {
                this.props.loginModal ?
                <div>
                <Register doUpdateCurrentUser = {this.props.doUpdateCurrentUser}/> <Login  doUpdateCurrentUser={this.props.doUpdateCurrentUser}/>
                </div>
                : null
            }
        
            </>
        )
    }
}

export default NavBar