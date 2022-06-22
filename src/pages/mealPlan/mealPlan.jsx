import { Container } from "@mui/material"
import { Box } from "@mui/system"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { DataContext } from "../../app/Providers/DataProvider"
import Day from "../../components/Day"

const MealPlan = () => {

  const { regUser, messages, setMessages } = useContext(DataContext)

  useEffect(() => getMealPlan(), [mealPlan])

  const [mealPlan, setMealPlan] = useState()

  async function getMealPlan() {
    let url = `http://localhost:5000/meal_plan/${regUser.id}`
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
      setMessages([...messages], e.message)
    }
  }


  const addStoreTrip = () => {  }

  return (
    <Container>
      <Box>
      { mealPlan ? 
        mealPlan.map((day) => <Day day={day} />) 
      : null }
      </Box>
    </Container>
  )
}

export default MealPlan 