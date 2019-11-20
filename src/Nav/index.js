import React from 'react'
import "./nav.css"

function NavBar () {
    return(
        <div class="nav-row">
            <div class="nav-col">
                <a class="nav-anchor" href="#">Home</a>
            </div>
            <div class="nav-col">
                <a class="nav-anchor" href="#">Create Recipe</a>
            </div>
            <div class="nav-col">
                <a class="nav-anchor" href="#">Explore</a>
            </div>
            <div class="nav-col">
                <a class="nav-anchor" href="#">Login/Register</a>
            </div>
        </div>
    )
}

export default NavBar