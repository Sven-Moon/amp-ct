import { borderRadius } from "@mui/system"

const CategoryIcon = ({ kind, size }) => {

  kind = kind?.toLowerCase()
  size = size || "md"
  const p = {
    beef: {
      text: "B",
      bg: '#99222c'
    },
    vegetarian: {
      text: "V",
      bg: '#02d43a'
    },
    chicken: {
      text: "C",
      bg: '#140f10'
    },
    pork: {
      text: "P",
      bg: '#fab8a0'
    },
    fish: {
      text: "F",
      bg: '#e4eef5'
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