import { useContext, useState } from "react";
import { DataContext } from "../../app/Providers/DataProvider";

const RecipeCard = (props) => {

  const { regUser } = useContext(DataContext)
  const { messages, setMessages } = useContext(DataContext)

  const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const { r, i, u } = props

  function removeRecipe(recipe_id) {
    let url = `https://amp-ct-api.herokuapp.com/api/v1/user/${regUser.username}/recipe/${recipe_id}/remove`
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': regUser['access-token']
      }
    }
    fetch(url, options)
      .then(resp => {
        if (resp.ok) {
          setMessages([...messages], 'Recipe removed')
        }
        else throw Error('Unable to remove recipe')
      })
      .catch((e) => setMessages([messages, e.message]))
  }

  return (
    <div key={r.name + i} className="recipe-card_box">

      {/* floating */}
      <button onClick={removeRecipe}>-</button>

      <div className="row">
        <div className="col">
          <div className="recipe-name">{r.name}</div>
          {/* small */}
          <div className="last-made">Last made: {r.created_by === u.username ? r.last_made ? new Date(r.last_made).toLocaleDateString('en-US', DATE_OPTIONS) : 'Never' : '---'}
          </div>
          <ul className="ingredient-list">
            <li>ingr</li>
            <li>ingr</li>
            <li>ingr</li>
          </ul>
        </div>
        <div className="col">
          <button type='button'>Edit</button>
          <button type='button'>Shh</button>
          <div className="recipeImage" style={{ backgroundImage: `url(${r.image})` }}></div>
          <div className="ratings">
            <div className="rating">{r.rating}</div>
            <div className="rating">{r.average_cost_rating}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <fieldset>
          <legend>Total Time: {parseInt(r.cook_time) + parseInt(r.prep_time)}</legend>
          <div>Prep Time: {r.prep_time}</div>
          <div>Cook Time: {r.cook_time}</div>
        </fieldset>
      </div>
      <div className="classes">
        <div className="meal-types"></div>
        <div className="categories"></div>
      </div>
      <div className="instructions"></div>
    </div>
  );

}

export default RecipeCard