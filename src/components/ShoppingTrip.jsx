import { Avatar, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import CategoryIcon from "./categoryIcon/CategoryIcon"
import TimeIcon from "./timeIcon/TimeIcon"

const Meal = ({ r, m }) => {


  return (
    <Button>
      <Stack color="primary" direction="row">
        <Avatar src={r.image} variant="square">
          N
        </Avatar>
        <Typography>{r.name}</Typography>
        <TimeIcon minutes={r.cook_time + r.prep_time}></TimeIcon>
        <CategoryIcon kind={r.categories}></CategoryIcon>
        <Typography>{m}</Typography>
      </Stack>
    </Button>
  )
}

export default Meal