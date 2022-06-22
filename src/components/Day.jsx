import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import Meal from "./Meal"
import { useEffect, useContext } from 'react';
import { DataContext } from "../app/Providers/DataProvider";



const Day = ({day}) => {
  const { messages, setMessages, regUser, userRecipes, setUserRecipes } = useContext(DataContext)

  useEffect(() => {
    if (!userRecipes) { getRegUserRecipes() } }, [])
  
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
        setUserRecipes(data.recipes) // [ { RecipeBox } ]
      }
    } catch (e) {
      setMessages([...messages], e.message)
    }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction='column'>
          <Stack direction="row">
            <Typography sx={{ fontSize: 1.25+'rem' }} color="text.secondary" gutterBottom>
              {day.date.toLocaleDateString('en-US', {day: 'long'})}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year:'numeric'})}
            </Typography>
          </Stack>
          <Meal r={day.breakfast} m="B" />
          <Meal r={day.lunch} m="L" />
          <Meal r={day.dinner} m="D" />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default Day