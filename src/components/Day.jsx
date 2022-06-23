import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import Meal from "./Meal"
import { useEffect, useContext } from 'react';
import { DataContext } from "../app/Providers/DataProvider";



const Day = ({day}) => {
  const { messages, setMessages, regUser, userRecipes, setUserRecipes } = useContext(DataContext)

  // define bld as lookup of user recipes
  let breakfast = userRecipes[day.breakfast_recipe_id]
  let lunch = userRecipes[day.lunch_recipe_id]
  let dinner = userRecipes[day.dinner_recipe_id]

  console.log('day:', day)
  useEffect(() => {
    if (!userRecipes) { 
      getRegUserRecipes()
      async function getRegUserRecipes() {
        let url = `http://localhost:5000/api/v1/recipes/recipebox/${regUser.username}`
        let options = {
          method: 'POST',
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' }
        }
        try {
          const resp = await fetch(url, options)
          const data = await resp.json()
          if (!resp.ok) throw data
          else {
            console.log('data.recipes:', data.recipes)
            setUserRecipes(data.recipes) // [ { RecipeBox } ]
          }
        } catch (e) {
          console.log((e.message))
          setMessages([...messages], e.message)
        }
      }
     } }, [])
  
    let date = new Date(day?.date)
  console.log(day?.date)

  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }} >
      <div style={{ margin:'1rem 1rem 0 1rem' }}>
        <Stack direction='column' spacing={1}>
          <Stack direction="row" spacing={2} alignItems="end">
            <Typography sx={{ fontSize: 1.25+'rem', marginBottom: 0 }} color="text.secondary" gutterBottom>
              {date?.toLocaleDateString('en-US', {weekday: 'long'})}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Typography>
          </Stack>
          <Meal r={breakfast} m="B" />
          <Meal r={lunch} m="L" />
          <Meal r={dinner} m="D" />
        </Stack>
      </div>
    </Card>
  )
}

export default Day