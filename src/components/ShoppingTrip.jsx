import { Avatar, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import CategoryIcon from "./categoryIcon/CategoryIcon"
import TimeIcon from "./timeIcon/TimeIcon"

const Meal = ({ r, m }) => {


  let meat_options = r.meat_options ? r.meat_options : r.custom_meat_options
  console.log(r)

  return (
    <Button>
      <Stack color="primary" direction="row">
        <Avatar src={r.image} variant="square">
          N
        </Avatar>
        <Typography>{r.name}</Typography>
        <TimeIcon minutes={r.cook_time + r.prep_time}></TimeIcon>
        <CategoryIcon kind={meat_options}></CategoryIcon>
        <Typography>{m}</Typography>
      </Stack>
    </Button>
  )
}

export default Meal