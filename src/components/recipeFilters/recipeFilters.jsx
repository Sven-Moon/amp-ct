import { FormControlLabel, Input, Slider, Switch, TextField, Typography } from "@mui/material"
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
  const marks = [
    {value: 0,
      label: '10'},
    {value: 15,
      label: '15'},
    {value: 30,
      label: '30'},
    {value: 45,
      label: '45'},
    {value: 60,
      label: '60'},
    {value: 90,
      label: '90'},
    {value: 120,
      label: '120'},
    {value: 180,
      label: '180'},
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  return (
    <Box sx={{backgroundColor:"white", alignSelf: 'center'}}>
      <fieldset>
        <legend>Time</legend>
        <Typography gutterBottom>Total Time</Typography>
        <Box sx={{ maxWidth: 800 }}>
          <Slider
            aria-label="Restricted values"
            defaultValue={45}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </Box>
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