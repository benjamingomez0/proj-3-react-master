import React, {Component} from 'react'
import Register from '../Register'
import { Link } from 'react-router-dom'
import "./nav.css"

class NavBar extends Component{
    render(){
        return(
            <>
            <div className="nav-row">
                <div className="nav-col">
                <Link to={'/'} className="nav-anchor">Explore</Link>
                </div>
                <div className="nav-col">
                <div>
                {
                    this.props.currentUser.email
                    ?
                    <Link to={'/recipes/new'} className="nav-anchor">Create Recipe</Link>
                    :
                    <a href="#" className="nav-anchor" onClick ={this.props.showLoginModal}>Create Recipe</a>
                }
                </div>
                </div>
                    {
                        this.props.currentUser.email
                        ?
                        <>
                        <div className="nav-col">
                            <Link to={`/user/${this.props.currentUser.id}`} className="nav-anchor">Hello {this.props.currentUser.first_name}</Link>
                        </div>
                        <div className="nav-col">
                            <Link to={`/`} className="nav-anchor" href="#" onClick={this.props.logout}> Logout</Link>
                        </div>
                        </>
                        :
                        <div className="nav-col">
                            <a href="#" className="nav-anchor" onClick ={this.props.showLoginModal}>Login/Register</a>
                        </div>
                    }
            </div>
            {
                this.props.loginModal ?
                <div>
                    <Register doUpdateCurrentUser = {this.props.doUpdateCurrentUser} closeLoginModal={this.props.closeLoginModal}/>
                </div>
                : null
            }
        
            </>
        )
    }
}

export default NavBar