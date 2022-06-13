import { FunctionComponent } from "react"; 
// npm install prop - types
// npm install - dev @types/prop-types
import PropTypes from 'prop-types'
import { useState } from "react";
import { stringify } from "@firebase/util";
import { postRecipeData } from "./services";


export const Recipe = () => {

  const [form, setform] = useState(new FormData())

  const submitRecipe = (e) => {
    e.preventDefault()

    let form = {}
    form["name"] = document.querySelector('[name="name"]').value
    form["prep_time"] = document.querySelector('[name="prepTime"]').value
    form["cook_time"] = document.querySelector('[name="cookTime"]').value
    form["instructions"] = document.querySelector('[name="instructions"]').value
    form["category"] = document.querySelector('[name="category"]').value
    form["meal_types"] = document.querySelector('[name="mealTypes"]').value
    form["image"] = document.querySelector('[name="image"]').value
    let ing_names = document.querySelectorAll('[name="ingr-name"]')
    let qtys = document.querySelectorAll('[name="quantity"]')
    let uoms = document.querySelectorAll('[name="uom"]')
    // put ingredients into an array and attach as "ingredients"
    let ingredients = []
    for (let i=0; i<ing_names.length; i++) {
      let ingredient = {}
      ingredient['name_'+i] = ing_names[i].value
      ingredient['quantity_' + i] = qtys[i].value
      ingredient['uom_' + i] = uoms[i].value
      ingredients.push(ingredient)
    }
    form['ingredients'] = ingredients

    postRecipeData(form)
  }

  function addIngredientLine(e) {
    e.preventDefault()
    let i = parseInt(e.target.parentNode.dataset.ingrIndex)
    const ingredientsNode = document.querySelector('#ingredients')
    const node = document.createElement("div")
    node.className = "ingredient"
    node.setAttribute("data-ingr-index",i+1)
    node.innerHTML = `
      <label htmlFor="name">Name</label>
      <input type="text" name="ingr-name"/>

      <label htmlFor="quantity">Qty</label>
      <input type="text" name="quantity"  data-qty="${i + 1}"/>

      <label htmlFor="uom">Meas.</label>
      <input type="text" name="uom" />`

    let addButton = document.createElement("button")
    addButton.className = "addIngredient"
    addButton.onclick = addIngredientLine
    addButton.innerHTML = "+"
    node.appendChild(addButton)

    let removeButton = document.createElement("button")
    removeButton.className = "addIngredient"
    removeButton.onclick = removeIngredientLine
    removeButton.innerHTML = "-"

    node.appendChild(removeButton)
    ingredientsNode.appendChild(node)

    reorderIngredientIndices()
  }

  function removeIngredientLine(e) {
    e.preventDefault()
    let i = parseInt(e.target.parentNode.dataset.ingrIndex)
    document.querySelector(`[data-ingr-index="${i}"`).remove()
    
    reorderIngredientIndices()
  }

  function reorderIngredientIndices() {
    const ingredientNodes = document.querySelectorAll('.ingredient')
    ingredientNodes.forEach((node,i) => {
      node.setAttribute("data-ingr-index", i)
    })
  }

  return (
    <div className="form-container">
      <form onSubmit={submitRecipe} id="recipeForm">
      
        <div className="control-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="recipeName" />
        </div>

        <div className="control-group">
          <label htmlFor="prepTime">Prep Time</label>
          <input type="number" name="prepTime" id="prepTime" />
        </div>

        <div className="control-group">
          <label htmlFor="cookTime">Cook Time</label>
          <input type="number" name="cookTime" id="cookTime" />
        </div>

        <div className="control-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea rows={4} cols={50} name="instructions" id="instructions" />
        </div>

        <div className="control-group">
          <label htmlFor="category">Category</label>
          <input type="text" name="category" id="category" />
        </div>

        <div className="control-group">
          <label htmlFor="mealTypes">Meal Type(s)</label>
          <input type="number" name="mealTypes" id="mealTypes" />
        </div>

        <div className="control-group">
          <label htmlFor="image">Image (url)</label>
          <input type="text" name="image" id="image" />
        </div>

        <div className="control-group">
          <fieldset id="ingredients"><legend>Ingredients</legend>
            <div className="ingredient" data-ingr-index="1">
              <label htmlFor="ingr-name">Name</label>
              <input type="text" name="ingr-name" />

              <label htmlFor="quantity">Qty</label>
              <input type="number" name="quantity" id="quantity" data-qty="0" />

              <label htmlFor="uom">Meas.</label>
              <input type="text" name="uom" id="uom" />

              <button className="addIngredient" type="button" data-add_btn-index="0" onClick={addIngredientLine}>+</button>
              <button className="removeIngredient" type="button" onClick={removeIngredientLine}>-</button>
            </div>
          </fieldset>        
        </div>

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default Recipe