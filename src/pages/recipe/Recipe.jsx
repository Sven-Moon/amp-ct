import { Button, ButtonGroup, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { useUser } from 'reactfire';
import { DataContext } from "../../app/Providers/DataProvider";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { red } from '@mui/material/colors';
import { Box } from "@mui/system";

export const Recipe = () => {

  const [form, setform] = useState(new FormData())
  const { regUser } = useContext(DataContext)
  const { messages, setMessages } = useContext(DataContext)
  const [ingredientCount, setIngredientCount] = useState([0])

  const submitRecipe = (e) => {
    e.preventDefault()

    // TODO: convert to form submission
    let form = {}
    form["name"] = document.querySelector('[name="name"]').value
    form["prep_time"] = document.querySelector('[name="prepTime"]').value || null
    form["cook_time"] = document.querySelector('[name="cookTime"]').value || null
    form["instructions"] = document.querySelector('[name="instructions"]').value
    form["meat_options"] = document.querySelector('[name="meat_options"]').value
    form["meal_types"] = mealType
    form["image"] = document.querySelector('[name="image"]').value || null
    form["created_by"] = regUser.username
    let ing_names = document.querySelectorAll('[name="ingr-name"]')
    let qtys = document.querySelectorAll('[name="quantity"]')
    let uoms = document.querySelectorAll('[name="uom"]')
    // put ingredients into an array and attach as "ingredients"
    // TODO: add ingredient prep modifier
    // TODO: validate on at least 1 ingredient
    let ingredients = []
    for (let i=0; i<ing_names.length; i++) {
      let ingredient = {}
      ingredient['name_'+ i] = ing_names[i].value
      ingredient['quantity_' + i] = qtys[i].value
      ingredient['uom_' + i] = uoms[i].value
      ingredients.push(ingredient)
    }
    form['ingredients'] = ingredients

    postRecipeData(form)
  }

  const postRecipeData = async (form) => {
    let url = 'http://127.0.0.1:5000/api/v1/recipes/create'
    let body = JSON.stringify(form)
    let options = {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(url, options).then(res => res.json())
      .then(data =>{
        setMessages([...messages], data.message)
        formReset()
      })
      .catch(err => {
        console.log(err)
        setMessages([...messages], err.message)
      })
  }

  function formReset() {
    document.getElementById('recipeForm').reset()
  }

  function IngredientGroup({i}) {
    return (
      <FormGroup id="ingredient-group_0" data-ingr-index={i} className="ingredient">
        <TextField
          name={"ingr-name_"+i}
          label="Name"
          variant="filled"
          defaultValue={null}
          type="text"
          required
        ></TextField>
        <TextField
          name={"quantity_"+i}
          label="Quantity"
          variant="filled"
          defaultValue={null}
          type="text"
        ></TextField>
        <TextField
          name={"uom_"+i}
          label="Unit of Measure"
          variant="filled"
          defaultValue={null}
          type="text"
        ></TextField>
        <Stack direction="row" justifyContent={'space-around'}>
          <Button data-ingr-index={i} className="addIngredient" color="success" type="button" data-add_btn-index={i} onClick={addIngredientLine}>
            <KeyboardDoubleArrowDownIcon data-ingr-index={i} />
            <AddCircleIcon data-ingr-index={i} />
          </Button>
          <Button data-ingr-index={i} className="removeIngredient" sx={{ color: red[700] }} type="button" onClick={removeIngredientLine}>
            <RemoveCircleIcon data-ingr-index={i} />
            <KeyboardDoubleArrowUpIcon data-ingr-index={i} />
          </Button>
        </Stack>
      </FormGroup>
    )
  }

  function addIngredientLine(e) {
    e.preventDefault()
    let new_val = [...ingredientCount]
    new_val.push(ingredientCount.length)
    setIngredientCount(new_val)

    // reorderIngredientIndices()
  }

  function removeIngredientLine(e) {
    e.preventDefault()
    if (ingredientCount.length === 1) return
    setIngredientCount(ingredientCount.slice(0,ingredientCount.length-1))
    
    // reorderIngredientIndices()
  }
  
  function reorderIngredientIndices() {
    const ingredientNodes = document.querySelectorAll('.ingredient')
    ingredientNodes.forEach((node,i) => {
      node.setAttribute("data-ingr-index", i)
    })
  }
  function handleMeatOptionsChange(e) {
    setform({ ...form, meat_options: e.target.value })
  }

  const [mealType, setMealType] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
  })
  const { breakfast, lunch, dinner } = mealType;

  const handleMealTypeChange = (event) => {
    setMealType({
      ...mealType,
      [event.target.name]: event.target.checked,
    });
  };

  const error = [breakfast, lunch, dinner].filter((v) => v).length < 1;

  return (
    <Box display={'flex'} elevation={1} justifyContent={'center'} className="form-container" flexDirection={'column'}>
      <h1 style={{textAlign: "center"}}>Make Something Delicious... and Share It</h1>
      <form onSubmit={submitRecipe} id="recipeForm">
      
      <Stack spacing={2}>
        <FormGroup id="name-group">
          <TextField
          name="name"
          label="Recipe Name"
          variant="filled"
          helperText="This name must be unique. Consider adding your name to it if it is not."
          required
          ></TextField>
        </FormGroup>

        <FormGroup id="cook-time-group">
          <TextField 
            name="prepTime"
            label="Prep Time"
            variant="filled"
            defaultValue={0}
            type="number"
            ></TextField>
          </FormGroup>

        <FormGroup id="cook-time-group">
          <TextField 
            name="cookTime"
            label="Cook Time"
            variant="filled"
            defaultValue={0}
            type="number"
            ></TextField>
          </FormGroup>          

        <FormGroup id="instructions-group">
          <TextField
            name="instructions"
            label="Instructions"
            variant="filled"
            defaultValue={null}
            type="text"
            multiline={true}
            rows={4}
          ></TextField>
        </FormGroup>

        <FormControl id='meat-options-group'>
          <InputLabel>Meat Option</InputLabel>
          <Select
            id="meat-options-select"
            labelId="meat-options-select-label"
            label="Meat Options"
            onChange={handleMeatOptionsChange}
            value={form.meatOption}
            sx={{minWidth:10+"rem"}}
            name='meat_options'
            required
          >
          <MenuItem value={"vegetarian"}>Vegetarian</MenuItem>
          <MenuItem value={"beef"}>Beef</MenuItem>
          <MenuItem value={"chicken"}>Chicken</MenuItem>
          <MenuItem value={"fish"}>Fish</MenuItem>
          <MenuItem value={"pork"}>Pork</MenuItem>
          </Select>
        </FormControl>

        <FormControl id='meal-type-group'
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
          name="meal_types"
        >
          <FormLabel component="legend">Meal Type</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={breakfast} onChange={handleMealTypeChange} name="breakfast" />
              }
              label="Breakfast"
            />
            <FormControlLabel
              control={
                <Switch checked={lunch} onChange={handleMealTypeChange} name="lunch" />
              }
              label="Lunch"
            />
            <FormControlLabel
              control={
                <Switch checked={dinner} onChange={handleMealTypeChange} name="dinner" />
              }
              label="Dinner"
            />
          </FormGroup>
          <FormHelperText>At least 1 must be checked</FormHelperText>
        </FormControl>

        <FormGroup id="image-group">
          <TextField
            name="image"
            label="Image Url"
            variant="filled"
            defaultValue={null}
            type="text"
          ></TextField>
        </FormGroup>

        <div className="control-group">
          <fieldset id="ingredients"><legend>Ingredients</legend>
            { 
                ingredientCount.map((i) => {
                  return <IngredientGroup i={i}/>
                })
            }
          </fieldset>        
        </div>

        <Button type="submit">Submit Recipe</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Recipe