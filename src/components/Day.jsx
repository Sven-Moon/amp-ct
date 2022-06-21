import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import Meal from "./Meal"

const Day = ({day}) => {


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