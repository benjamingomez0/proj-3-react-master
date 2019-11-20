import React from 'react'
import "./nav.css"

function NavBar () {
    return(
        <div class="nav-row">
            <div class="nav-col">
                <a href="#">Home</a>
            </div>
            <div class="nav-col">
                <a href="#">Create Recipe</a>
            </div>
            <div class="nav-col">
                <a href="#">Explore</a>
            </div>
            <div class="nav-col">
                <a href="#">Login/Register</a>
            </div>
        </div>
    )
}

export default NavBar