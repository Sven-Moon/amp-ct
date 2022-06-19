import { useContext } from "react";
import { DataContext } from "../../app/Providers/DataProvider";

const RecipeCard = (props) => {

  const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  console.log(props)
  const { r, i, u } = props

  return (
    <div key={r.name + i} className="recipe-card_box">
      <div className="row">
        <div className="recipeImage" style={{ backgroundImage: `url(${r.image})` }}></div>
        <div className="recipe-name">{r.name}</div>
      </div>
      <div className="row">
        <div className="badge">{r.prep_time + r.cook_time}</div>
      </div>
      <div className="recipe-category">{r.category}</div>
      <div className="last-made">Last made: {r.created_by === u.username ? r.last_made ? new Date(r.last_made).toLocaleDateString('en-US', DATE_OPTIONS) : 'Never' : '---'}
      </div>
    </div>
  );
  
}

export default RecipeCard