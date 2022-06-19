
import { useContext } from "react";
import { useState, useEffect } from "react";
import { DataContext } from "../../app/Providers/DataProvider";
import RecipeCardSm from '../../components/recipeCardSm/RecipeCardSm'


export const RecipeBox = () => {
  
  const { regUser, setRegUser } = useContext(DataContext)
  const { messages, setMessages } = useContext(DataContext)
  const [ userRecipes, setUserRecipes ] = useState([])
  const [ filters, setFilters ] = useState({
    user: regUser.username,
    time: null,
    category: null,
    meal_types: '123',
    last_made: null,
    rating: null,
    average_cost_rating: '123'
  })

  useEffect(() => { getUserRecipes()}, [filters])
  
  const getUserRecipes = async () => {
    let url = 'http://localhost:5000/api/v1/recipes'
    let options = {
      method: 'POST', 
      body: filters,
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url,options)
    .then(resp => {
      if (resp.ok) return resp.json()
      else throw Error('Could not find recipes with that username')
    })
    .then(data => {
      // data = { recipes: [{recipe}] }
      setUserRecipes(userRecipes.concat(data.recipes) )
    })
    .catch((e) => {
      setMessages([...messages], e.message)
    })
  }

  function showFilters(e) {
    e.preventDefualt()
    console.log('clicked filters!')
  }


  return (
    <>
      <h1>Recipe Box</h1>
      <div className="filters-box">
        <div className="filters" onClick={showFilters}>Filters</div>
      </div>
      <div className="recipes_box">
        { userRecipes ?
        userRecipes.map((r,i) => <RecipeCardSm />)
        : null
         }
      </div>
    </>

  );
}

export default RecipeBox