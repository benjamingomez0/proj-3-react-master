import React from 'react'
import {PulseLoader} from "react-spinners"
import {Link} from "react-router-dom"
import "./recipeEdit.css"

const EditRecipe = (props) => {
    return (
        <div open={props.showEdit} id="edit-recipe-container">
            <div id="edit-recipe-background-layer">
                <h1 id="edit-recipe-header">Edit Your Hattrick</h1>
                <form id="edit-recipe-form" onSubmit={props.closeAndEdit}>
                    Recipe Name: <input type="text" name="recipeName" value={props.recipeToEdit.recipeName} onChange={props.handleEditChange}/><br/>
                    Ingredient 1: <input type="text" name="ingredient1" value={props.recipeToEdit.ingredient1} onChange={props.handleEditChange}/>
                    <input placeholder="Ounces" value={props.recipeToEdit.ingredient1Amount} type="number" min="0" name="ingredient1Amount" onChange={props.handleEditChange}/><br/>
                    Ingredient 2: <input type="text" name="ingredient2" value={props.recipeToEdit.ingredient2} onChange={props.handleEditChange}/>
                    <input placeholder="Ounces" value={props.recipeToEdit.ingredient2Amount} type="number" min="0" name="ingredient2Amount" onChange={props.handleEditChange}/><br/>
                    Ingredient 3: <input type="text" name="ingredient3" value={props.recipeToEdit.ingredient3} onChange={props.handleEditChange}/>
                    <input placeholder="Ounces" value={props.recipeToEdit.ingredient3Amount}type="number" min="0" name="ingredient3Amount" onChange={props.handleEditChange}/><br/>
                    Servings: <input type="number" min="1" name="servings" value={props.recipeToEdit.servings} onChange={props.handleEditChange} required/><br/>
                    Recipe Image URL: <input type="text" name="imgURL" value={props.recipeToEdit.imgURL} onChange={props.handleEditChange}/><br/>
                    <textarea placeholder="Tell us how to cook your dish!" type="text" name="directions" value={props.recipeToEdit.directions} rows="10" onChange={props.handleEditChange}/><br/>
                    <div id="cal-total">
                        Calories Per Serving: {props.recipeToEdit.cal}
                    </div>
                    <div className="loader">
                        <PulseLoader sizeUnit={"px"} size={15} color={"rgb(68, 177, 250)"} loading={props.loading}/>
                    </div>
                    <div className="error">{props.error1}</div>
                    <div className="error">{props.error2}</div>
                    <div className="error">{props.error3}</div>
                    <button type="submit" id="edit-recipe-button" type='submit'>Hattrick!</button>
                    
                </form>
            {/* <button onClick={() => {props.mount()}}>Cancel</button> */}
            <button id="delete-recipe-button" onClick={()=>{props.deleteRecipe(props.recipeToEdit.id)}}> Delete Recipe</button>
            </div>
        </div>
    )
}
export default EditRecipe