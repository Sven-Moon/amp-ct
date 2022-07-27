import { Stack, Typography } from "@mui/material"
import { borderRadius } from "@mui/system"

const TimeIcon = (props) => {

  let { minutes, size } = props
  size = size || "md"


  let color = setColor(minutes)

  function setColor(minutes) {
    if (minutes <= 10) return '#3dd40f'
    else if (minutes <= 20) return '#05a10d'
    else if (minutes <= 30) return '#93d406'
    else if (minutes <= 45) return '#999c16'
    else if (minutes <= 60) return '#cfbe06'
    else if (minutes <= 90) return '#cf8206'
    else if (minutes <= 120) return '#a12c05'
    else return '#a10527'
  }

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
    <Typography lineHeight={.75} color="#333" fontSize={s[size]?.uom_font} fontWeight={500} textAlign='center'>
      {uot}
      </Typography>
    </Stack>
    </div>
      
  )
    
  
}

export default TimeIcon