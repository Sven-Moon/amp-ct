import { Stack, Typography } from "@mui/material"
import { borderRadius } from "@mui/system"

const TimeIcon = (props) => {

  let { minutes, size } = props
  size = size || "md"

  if (minutes <= 10) var color = '#3dd40f'
  else if (minutes <= 20) var color = '#05a10d'
  else if (minutes <= 30) var color = '#93d406'
  else if (minutes <= 45) var color = '#999c16'
  else if (minutes <= 60) var color = '#cfbe06'
  else if (minutes <= 90) var color = '#cf8206'
  else if (minutes <= 120) var color = '#a12c05'
  else var color = '#a10527'

  const time = (minutes > 60) ? (minutes / 60).toFixed(1) : minutes.toString()
  const uot = (minutes > 60) ? "Hrs" : "Min"
  const s = {
    lg: {
      h: 32,
      font: 20,
      uom_font: 9
    },
    md: {
      h: 28,
      font: 18,
      uom_font: 8
    },
    sm: {
      h: 24,
      font: 14,
      uom_font: 7
    },
    xsm: {
      h: 20,
      font: 12,
      uom_font: 7
    },
  }

  return (
    <div className="displayIconRound" style={{ backgroundColor: color, height: s[size]?.h, fontSize: s[size]?.font }}>
    <Stack direction="column"> 
    <Typography marginTop={.4} lineHeight={.75} fontSize={s[size]?.font}>
      {time}
    </Typography>    
    <Typography lineHeight={.75} color="#333" fontSize={s[size]?.uom_font} fontWeight={500}>
      {uot}
      </Typography>
    </Stack>
    </div>
      
  )
    
  
}

export default TimeIcon