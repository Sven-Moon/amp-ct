import { borderRadius } from "@mui/system"

const TimeIcon = (props) => {

  let { minutes, size } = props
  size = size || "md"

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
      h: "2rem",
      font: "1.75rem"
    },
    md: {
      h: "1.5rem",
      font: ".75rem"
    },
    sm: {
      h: "1rem",
      font: ".5rem"
    },
    xsm: {
      h: ".75rem",
      font: ".5rem"
    },
  }

  return <div className="displayIconRound" style={{backgroundColor:color, height:s[size]?.h, fontSize:s[size]?.font}}>{minutes}</div>
}

export default TimeIcon