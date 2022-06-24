

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import CategoryIcon from '../displayIconsRound/CategoryIcon';
import { useState } from 'react';
import { List, ListItem, ListItemIcon, Stack } from '@mui/material';
import TimeIcon from '../displayIconsRound/TimeIcon';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'; 
import { useContext } from 'react';
import { DataContext } from '../../app/Providers/DataProvider';
import { pink } from '@mui/material/colors';

const UserRecipeCardSm = ({ r }) => {

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
  const { messages, setMessages, userRecipes, setUserRecipes } = useContext(DataContext)

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

  const removeFromRecipebox = async () => {
    let url = `http://localhost:5000/api/v1/recipes/recipebox/${regUser.username}/remove/${r.id}`
    let options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify ({})
    }    
    try {
      const resp = await fetch(url, options)
      const data = await resp.json()
  
      if (resp.ok) { 
        setMessages([...messages], 'Recipe was removed from Recipe Box')
        setUserRecipes(Object.keys(userRecipes)
          .filter(k => !k.includes(r.id)).reduce((cur, k) => {
            return Object.assign(cur, { [k]: userRecipes[k] })
          }, {})
        )    
      } else throw data
    } catch (e) {
      console.error(e.message)
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
          <CategoryIcon kind={r.custom_meat_options} size="md"/>
            <Stack direction="row" spacing={1}>
            <TimeIcon minutes={r.prep_time + r.cook_time} size="md"/>
              <div>Minutes</div>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Remove Recipe">
          <IndeterminateCheckBoxIcon sx={{ color: pink[500] }} onClick={removeFromRecipebox} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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

export default UserRecipeCardSm