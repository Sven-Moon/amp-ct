import { Avatar, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import CategoryIcon from "./categoryIcon/CategoryIcon"
import TimeIcon from "./timeIcon/TimeIcon"

const Meal = ({r, m}) => {
  
  // let meat_options = r.meat_options ? r.meat_options : r.custom_meat_options

  console.log('meal recipe', r)
  return (
    <Button variant="outlined">
      <Stack direction="row">
        <Avatar src={r?.image} variant="square">
          N
        </Avatar>
        <Typography>{r?.name}</Typography>
        <TimeIcon minutes={r?.cook_time+r?.prep_time}></TimeIcon>
        <CategoryIcon kind={r?.customs_meat_options}></CategoryIcon>
        <Typography>{m}</Typography>
      </Stack>
    </Button>
  )
}

export default Meal