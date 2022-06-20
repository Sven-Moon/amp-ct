
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Typography } from '@mui/material';

const RecipeCardSm = (props) => {

  const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  console.log(props)
  const { r, i, u } = props
  console.log(r)

  return (
    <div key={r.name + i} className="recipe-card_box mdc-card mdc-card--outlined mdc-card__primary-action">
      <div className="my-card__media mdc-card__media mdc-card__media--16-9">
        <div className="mdc-card__media-content" style={{ backgroundImage: `url(${r.image})` }}></div>
        <div className="recipe-name">{r.name}</div>
      </div>
      <div className="row">
        <div className="badge">{r.prep_time + r.cook_time}</div>
      </div>
      <div className="recipe-category">{r.category}</div>
      <div className="last-made">Last made: {r.created_by === u.username ? r.last_made ? new Date(r.last_made).toLocaleDateString('en-US', DATE_OPTIONS) : 'Never' : '---'}
      </div>
      <Button variant="text" startIcon={<AcUnitIcon />}color="success">Hello World</Button>
      <Button variant="contained" startIcon={<AcUnitIcon />}color="primary" sx={{backgroundColor:"red", "&:hover": {backgroundColor:"lightblue"}}}>Custom color with sx</Button>
      <Typography variant='h3' component='h2'>Thingy</Typography>
    </div>
  );
  
}

export default RecipeCardSm