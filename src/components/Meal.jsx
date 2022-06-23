import { Avatar, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import CategoryIcon from "./displayIconsRound/CategoryIcon"
import TimeIcon from "./displayIconsRound/TimeIcon"
import TitleCase from 'react-title-case'

const Meal = ({r, m}) => {
  
  // let meat_options = r.meat_options ? r.meat_options : r.custom_meat_options

  console.log('meal recipe', r)
  return (
    <Button variant="outlined">
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Avatar src={r?.image} variant="square">
          N
        </Avatar>
        <Typography c padding={1} flex="3 1 auto" textAlign='left'><TitleCase string={r?.name}></TitleCase></Typography>
        <TimeIcon minutes={r?.cook_time+r?.prep_time} ></TimeIcon>
        <CategoryIcon kind={r?.custom_meat_options}></CategoryIcon>
        <Typography>{m}</Typography>
      </Stack>
    </Button>
  )
}

export default Meal