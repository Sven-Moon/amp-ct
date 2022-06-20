import { borderRadius } from "@mui/system"

const TimeIcon = (props) => {

  const {minutes, size} = props

  if (minutes <= 10) var color = '#76f553'
  else if (minutes <= 20) var color = '#38a82c'
  else if (minutes <= 30) var color = '#72a82c'
  else if (minutes <= 45) var color = '#9aa82c'
  else if (minutes <= 60) var color = '#a88d2c'
  else if (minutes <= 90) var color = '#a8762c'
  else if (minutes <= 120) var color = '#a8552c'
  else var color = '#a82020'


  const s = {
    lg: {
      h: 1.5,
      font: .75
    },
    md: {
      h: 1,
      font: .5
    },
    sm: {
      h: .75,
      font: .5
    },
    xsm: {
      h: .5,
      font: .25
    },
  }
    

  return <div className="categoryIcon" style={{backgroundColor:color, height:s[size].h+"rem", fontSize:s[size].font+"rem"}}>{minutes}</div>
}

export default TimeIcon