import { Button, Modal } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../app/Providers/DataProvider";
import RecipeCardSm from '../../components/recipeCardSm/RecipeCardSm'
import RecipeFilters from "../../components/recipeFilters/recipeFilters";


const RecipeBox = () => {
  
  const { regUser,  } = useContext(DataContext)
  const { messages, setMessages } = useContext(DataContext)
  const [ recipes, setRecipes ] = useState([])
  const { filters, setFilters } = useContext(DataContext)
    // prep_time: null,
    // cook_time: null,
    // categories: null,
    // meal_types: '123',
    // last_made: null, // pass a number of days (2w = 14d, etc)
    // rating: null,
    // average_cost_rating: '123'

  const [open, setOpen] = useState(false);
  const showFilters = () => setOpen(true);
  const hideFilters = () => setOpen(false);
  

  useEffect(() => { setFilters({...filters, created_by:regUser.username}) }, [regUser])
  useEffect(() => { getRecipes()}, [regUser, filters])
  
  const getRecipes = async () => {
    console.log('filters:', filters)
    let url = 'http://localhost:5000/api/v1/recipes/search'
    let options = {
      method: 'POST', 
      body: JSON.stringify(filters),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url,options)
    .then(resp => {
      if (resp.ok) return resp.json()
      else throw Error('Could not find recipes with that username')
    })
    .then(data => {
      console.log(data.recipes)
      // data = { recipes: [{recipe}] }
      setRecipes(data.recipes)      
    })
    .catch((e) => {
      setMessages([...messages], e.message)
    })
  }

  const openFullRecipe = (e) => {
    e.preventDefault()
    // open a modal 
    // display the recipe information
    // <RecipeCard r={r} />

  }

  return (
    <>
      <h1>Recipe Box</h1>
      <div className="filters-box">
        <div className="filters" onClick={showFilters}>Filters</div>
        <Button onClick={showFilters}>Filters</Button>
        <Modal open={open} onClose={hideFilters}>
          <RecipeFilters/>
        </Modal>
      </div>
      <div className="recipes_box">
        { recipes 
          ? recipes.map((r, i) => <RecipeCardSm r={r} i={i} u={regUser.username}/> )
        : null }
      </div>
    </>
  );
}

export default RecipeBox