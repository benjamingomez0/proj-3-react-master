import React from 'react'
import "./nav.css"

function NavBar () {
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
                <a className="nav-anchor" href="#">Login/Register</a>
            </div>
        </div>
    )
}

export default NavBar