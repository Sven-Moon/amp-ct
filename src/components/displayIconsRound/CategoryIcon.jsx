import { borderRadius } from "@mui/system"

const CategoryIcon = ({ kind, size }) => {

  kind = kind?.toLowerCase()
  size = size || "md"
  const p = {
    beef: {
      text: "B",
      bg: '#d5c67a'
    },
    vegetarian: {
      text: "V",
      bg: '#06A77D'
    },
    chicken: {
      text: "C",
      bg: '#005377'
    },
    pork: {
      text: "P",
      bg: '#f1a208'
    },
    fish: {
      text: "F",
      bg: '#052f5f'
    },
  }

  const s = {
    lg: {
      h: "2rem",
      font: "1.25rem"
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
  

  return <div className="displayIconRound" style={{backgroundColor:p[kind]?.bg, height:s[size].h, fontSize:s[size].font}}>{p[kind]?.text}</div>
}

export default CategoryIcon