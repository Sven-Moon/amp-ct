import { FormControlLabel, Input, Switch, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useContext } from "react"
import { DataContext } from "../../app/Providers/DataProvider"


const RecipeFilters = () => {

  const { filters, setFilters } = useContext(DataContext)
  function updateCheckFields(e) {
    e.preventDefault()
    let field_set = e.target.parentNode.parentNode.parentNode.parentNode.id
    let newValue = Object.assign({},filters)
    newValue[field_set][e.target.name] = e.target.checked
    setFilters(newValue)

  }

  return (
    <Box sx={{backgroundColor:"white", alignSelf: 'center'}}>
      <fieldset>
        <legend>Time</legend>
        <TextField
        label="Prep Time"
        name='prep_time'
        variant="filled"></TextField>
        <TextField
        label="Cook Time"
        name='cook_time'
        variant="filled"></TextField>
        <TextField
        label="Total Time"
        name='total_time'
        variant="filled"></TextField>
      </fieldset>

      <fieldset id="meat_options">
        <FormControlLabel
          control={<Switch 
          defaultChecked 
        onChange={updateCheckFields} 
          name='vegetarian' />}
          label='vegetarian' />
        <FormControlLabel
          control={<Switch 
          defaultChecked 
            onChange={updateCheckFields} 
          name='chicken' />}
          label='Chicken' />
        <FormControlLabel
          control={<Switch 
          defaultChecked 
            onChange={updateCheckFields} 
          name='beef' />}
          label='Beef' />
        <FormControlLabel
          control={<Switch 
          defaultChecked 
            onChange={updateCheckFields} 
          name='fish' />}
          label='Fish' />
        <FormControlLabel
          control={<Switch 
          defaultChecked 
            onChange={updateCheckFields} 
          name='pork' />}
          label='pork' />
      </fieldset>
    </Box>
  )
}

export default RecipeFilters