import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import CategoryIcon from '../displayIconsRound/CategoryIcon';
import { useState } from 'react';
import { List, ListItem, ListItemIcon, Stack } from '@mui/material';
import TimeIcon from '../displayIconsRound/TimeIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useContext } from 'react';
import { DataContext } from '../../app/Providers/DataProvider';
import BeenhereIcon from '@mui/icons-material/Beenhere';

const RecipeCardSm = ({ r }) => {

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const { regUser } = useContext(DataContext)
  const { messages, setMessages } = useContext(DataContext)
  const { userRecipes, setUserRecipes } = useContext(DataContext)

  const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToRecipebox = async () => {
    let url = `https://amp-ct-api.herokuapp.com/api/v1/recipes/recipebox/${regUser.username}/add/${r.id}`
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "custom_meal_types": null, "custom_meat_options": null,
        "schedule": true,
        "fixed_schedule": false, "fixed_period": 14
      })
    }
    // await fetch(url, options)
    // .then(resp => {
    //   if (resp.ok) {
    //     setMessages([...messages], 'Recipe added to Recipe Box')
    //     return resp.json()
    //   }
    //   else throw Error('Could not add recipe to Recipe Box')
    //   .then(data => console.log('addToRecipebox data:',data))
    // })
    // .catch(e => setMessages([...messages], e))

    try {
      const resp = await fetch(url, options)
      const data = await resp.json()

      if (resp.ok) {
        setMessages([...messages], 'Recipe added to Recipe Box')
        setUserRecipes(createUserRecipeObject(data.recipes))
      } else throw data.json()
    } catch (e) {
      console.error(e.message)
    }

    function createUserRecipeObject(userRecipesArray) {
      let urObj = {}
      for (let recipe of userRecipesArray) {
        urObj[recipe.id] = recipe
      }
      return urObj
    }
  }

  return (
    <Card variant='outlined' sx={{ maxWidth: 550 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={r.name}
        subheader={`By: ${r.created_by}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={r.image}
        alt=""
      />
      <CardContent>
        <Stack direction="row" spacing={2}>
          <CategoryIcon kind={r.meat_options} size="md" />
          <Stack direction="row" spacing={1}>
            <TimeIcon minutes={r.prep_time + r.cook_time} size="md" />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        {userRecipes[r.id]
          ? <BeenhereIcon />
          : <IconButton aria-label="Add to Recipe Box">
            <AddBoxIcon color="primary" onClick={addToRecipebox} />
          </IconButton>
        }

        {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>
            {r.ingredients.map(ingredient => <ListItem disablePadding>
              <ListItemIcon><CircleIcon /></ListItemIcon>{ingredient.name}</ListItem>)}
          </List>
        </CardContent>
      </Collapse>
    </Card>

  );
}

export default RecipeCardSm