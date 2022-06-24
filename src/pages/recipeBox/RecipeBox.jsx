import { Box, Button, Modal, Paper, Stack } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../app/Providers/DataProvider";
import RecipeCardSm from '../../components/recipeCardSm/RecipeCardSm'
import UserRecipeCardSm from '../../components/recipeCardSm/UserRecipeCardSm'
import RecipeFilters from "../../components/recipeFilters/recipeFilters";


const RecipeBox = () => {
  
  const { regUser, userRecipes, setUserRecipes } = useContext(DataContext)
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
  

  useEffect(() => { setFilters({...filters, username:regUser.username}) }, [regUser])
  useEffect(() => { getRecipes()}, [regUser, filters])
  
  const getRecipes = async () => {
    if (filters.userRecipes && !userRecipes) getRegUserRecipes()
    else getOthersRecipes()
  }
  async function getRegUserRecipes() {
    let url = `https://amp-api-ct.herokuapp.com/api/v1/recipes/recipebox/${regUser.username}`
    let options = {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, options)
      .then(resp => {
        if (resp.ok) return resp.json()
        else throw Error('Could not find recipes with that username')
      })
      .then(data => {
        setUserRecipes(createUserRecipeObject(data.recipes))
      })
      .catch((e) => {
        setMessages([...messages], e.message)
      })
  }
  function createUserRecipeObject(userRecipesArray) {
    let urObj = {}
    for (let recipe of userRecipesArray) {
      urObj[recipe.id] = recipe
    }
    return urObj
  }
  const getOthersRecipes = async () => {
    let url = 'https://amp-api-ct.herokuapp.com/api/v1/recipes/search'
    let options = {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, options)
      .then(resp => {
        if (resp.ok) return resp.json()
        else throw Error('Could not find recipes with that username')
      })
      .then(data => { // data = { recipes: [{recipe}] }   
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
  const toggleUserRecipes = () => {
    setFilters({...filters, userRecipes: !filters.userRecipes})
  }

  return (
    <Box>
        <h1>Recipe Box</h1>
        <Stack direction="row" justify-content="space-around"></Stack>
          <Button onClick={showFilters}>Filters</Button>
          <Modal open={open} onClose={hideFilters}>
            <RecipeFilters/>
          </Modal>
          <Button onClick={toggleUserRecipes}>{filters.userRecipes ? 'Find More Like This': 'Back to My Recipes'}</Button>
        <Paper style={{maxHeight:80+'vh', overflow: 'auto'}}>
            
                  <Box>
          {filters.userRecipes
            ? userRecipes
              ? Object.values(userRecipes).map((uRecipes, i) =>
                <UserRecipeCardSm key={i} r={uRecipes} i={i} u={regUser.username} />)
              : 'No Results matching search'
            : recipes.map((r, i) => <RecipeCardSm key={i} r={r} i={i} u={regUser.username} />)
           }
                  </Box>
        </Paper>
    </Box>
  );
}

export default RecipeBox