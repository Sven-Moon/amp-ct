

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import CategoryIcon from '../categoryIcon/CategoryIcon';
import { useState } from 'react';
import { List, ListItem, ListItemIcon, Stack } from '@mui/material';
import TimeIcon from '../timeIcon/TimeIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';

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
              <CategoryIcon kind={r.category} size="md"/>
            <Stack direction="row" spacing={1}>
            <TimeIcon minutes={r.prep_time + r.cook_time} size="md"/>
              <div>Minutes</div>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Add to Recipe Box">
            <AddBoxIcon />
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

export default RecipeCardSm