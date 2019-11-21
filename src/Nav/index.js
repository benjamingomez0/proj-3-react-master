import React from 'react'
import "./nav.css"

function NavBar (props) {
    return(
        <div className="nav-row">
            <div className="nav-col">
                <a className="nav-anchor" href="#">Home</a>
            </div>
            <div className="nav-col">
                <a className="nav-anchor" href="#">Create Recipe</a>
            </div>
            <div className="nav-col">
                <a className="nav-anchor" href="#">Explore</a>
            </div>
            <div className="nav-col">
                    {
                    props.currentUser.email?
                    <>
                    <span>Hello, {props.currentUser.first_name}</span>
                    <a className="nav-anchor" href="#"> Logout</a>
                    </>:
                    <button  onClick ={props.showLoginModal}>Login/Register</button>
                    }
            </div>
        </div>
    )
}

export default NavBar