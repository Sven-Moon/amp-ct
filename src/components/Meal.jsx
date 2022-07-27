import { Avatar, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import CategoryIcon from "./displayIconsRound/CategoryIcon"
import TimeIcon from "./displayIconsRound/TimeIcon"
import TitleCase from 'react-title-case'

const Meal = ({r, m}) => {
  
  // let meat_options = r.meat_options ? r.meat_options : r.custom_meat_options

  return (
    <Button variant="outlined">
      <Stack direction="row" width="100%" justifyContent="space-between" alignItems={'center'}>
        <Avatar src={r?.image} variant="square">
          N
        </Avatar>
        <Typography c padding={1} flex="3 1 auto" textAlign='left'><TitleCase string={r?.name}></TitleCase></Typography>
        <Stack direction={"row"} spacing={1} alignItems="center">
          <TimeIcon minutes={r?.cook_time+r?.prep_time} size='lg'></TimeIcon>
          <CategoryIcon kind={r?.custom_meat_options} size="lg"></CategoryIcon>
        <Typography fontSize={2+"rem"} fontWeight={'700'}>{m}</Typography>
        </Stack>
      </Stack>
    </Button>
  )
}

export default Meal