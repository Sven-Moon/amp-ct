import React, { useEffect, useState } from "react";

const RecipeCardSm = (props) => {

  const [message, setMessage] = useState(null);
  const { name, prep_time, cook_time, instructions, category, meal_types, last_made, image, rating, rating_count, average_cost_rating, created_by }  = props.r

  const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  }
  
  return (
    <div className="recipe-card_box">
      <div className="row">
        <div className="recipeImage" style={{backgroundImage: `url(${image})`}}></div>
        <div className="recipe-name">{name}</div>
      </div>
      <div className="row">
        <div className="badge">{prep_time+cook_time}</div>
      </div>
      <div className="recipe-category">{category}</div>
      <div className="last-made">Last made: {new Date(last_made).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
    </div>
  );
}

export default RecipeCardSm