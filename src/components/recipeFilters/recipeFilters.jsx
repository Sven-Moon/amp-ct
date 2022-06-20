import { Input } from "@mui/material"
import { useContext } from "react"


const RecipeFilters = () => {

  const { filters, setFilters } = useContext

  return (
    <div className="filter_box">
      <fieldset>
        <legend>Time</legend>
        <Input defaultValue="30" label="Total time"/>
        <Input defaultValue="chicken" label="Meat option"/>
      </fieldset>
    </div>
  )
}

export default RecipeFilters