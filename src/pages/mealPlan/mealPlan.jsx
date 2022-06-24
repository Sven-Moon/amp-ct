import { Button, Container, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { DataContext } from "../../app/Providers/DataProvider"
import Day from "../../components/Day"

const MealPlan = () => {

  const { regUser, messages, setMessages } = useContext(DataContext)
  const [mealPlan, setMealPlan] = useState({})

  useEffect(() => {

    async function getMealPlan() {
      let url = `https://amp-api-ct.herokuapp.com/api/v1/meal_plan/${regUser.id}`
      let options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      }
      try {
        const resp = await fetch(url, options)
        const data = await resp.json()
        if (!resp.ok) throw data
        else {
          setMealPlan(data.meal_plan) // [ { Day } ]
        }
      } catch (e) {
        console.log((e.message))
        setMessages([...messages], e.message)
      }
    }
    getMealPlan()

  }, [mealPlan[0]?.date])


  const addStoreTrip = () => { }

  return (
    <Container>
      <Button ml="auto" size="small">+ Store Trip</Button>
      <Paper style={{ overflow: 'auto' }}>
        <Box>
          {mealPlan[0] ?
            mealPlan.map((day, i) =>  <Day key={i} day={day} />
            )
            : null}
        </Box>
      </Paper>
    </Container>

  )
}

export default MealPlan 