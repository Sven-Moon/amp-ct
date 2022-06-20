import { useState, useContext } from "react";
import { useUser } from 'reactfire';
import { DataContext } from "../../app/Providers/DataProvider";


export const Recipe = () => {

  const [form, setform] = useState(new FormData())
  const { status, data: user } = useUser();
  const { regUser } = useContext(DataContext)
  const { messages, setMessages } = useContext(DataContext)

  const submitRecipe = (e) => {
    console.log(regUser)
    e.preventDefault()

    // TODO: convert to form submission
    let form = {}
    form["name"] = document.querySelector('[name="name"]').value
    // let prep_time = document.querySelector('[name="prepTime"]').value
    // console.log('prep_time = ', !!prep_time);
    form["prep_time"] = document.querySelector('[name="prepTime"]').value || null
    form["cook_time"] = document.querySelector('[name="cookTime"]').value || null
    form["instructions"] = document.querySelector('[name="instructions"]').value
    form["category"] = document.querySelector('[name="category"]').value
    form["meal_types"] = document.querySelector('[name="mealTypes"]').value || null
    form["image"] = document.querySelector('[name="image"]').value
    form["created_by"] = regUser.username
    let ing_names = document.querySelectorAll('[name="ingr-name"]')
    let qtys = document.querySelectorAll('[name="quantity"]')
    let uoms = document.querySelectorAll('[name="uom"]')
    // put ingredients into an array and attach as "ingredients"
    // TODO: add ingredient prep modifier
    let ingredients = []
    for (let i=0; i<ing_names.length; i++) {
      let ingredient = {}
      ingredient['name_'+ i] = ing_names[i].value
      ingredient['quantity_' + i] = qtys[i].value
      ingredient['uom_' + i] = uoms[i].value
      ingredients.push(ingredient)
    }
    form['ingredients'] = ingredients

    postRecipeData(form)
  }

  const postRecipeData = async (form) => {
    let url = 'http://127.0.0.1:5000/api/v1/recipes/create'
    let body = JSON.stringify(form)
    console.log(body);
    let options = {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(url, options).then(res => res.json())
      .then(data =>{
        setMessages([...messages], data.message)
        formReset()
      })
      .catch(err => {
        console.log(err)
        setMessages([...messages], err.message)
      })
  }

  function formReset() {
    document.getElementById('recipeForm').reset()
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
              <input type="text" name="quantity" id="quantity" data-qty="0" />

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