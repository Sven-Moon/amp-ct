import { Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Dashboard = () => {
  
  return (

    <div className="dashboard_box">
      <div className='hero'>
        <h1>STOP</h1>
        <h2>the stress of meal planning.</h2>
        <h4>Let us do it for you.</h4>
      </div>
      <div className='instruction'>
        <div className="img_box">
          <img src="https://res.cloudinary.com/sventerprise/image/upload/v1656011420/CT-amp/collect_recipes_kesvj6.png" alt="collect recipes" />
        </div>        
        <div className='copy'>
          <p>Start off by going to <Link to="/recipe-box">Recipe Box</Link> then <strong>Find More Meals</strong> and selecting some recipes you love. (Be sure to select enough recipes per meal to get to your next trip to the store!) </p>
          <p>If what you see isn't enough for you (maybe your favorite meal isn't there yet) you can adding by going to <Link to="/recipe">Author a Recipe</Link></p> to add it and make it available for anybody else, too.
        </div>
      </div>
      <div className='instruction'>
        <div className="img_box o2">
          <img src="https://res.cloudinary.com/sventerprise/image/upload/v1656012603/CT-amp/meal_plan_pyrezr.png" alt="meal plan" />
        </div>
        <div className='copy'>
          <p>Then, head over to your <Link to="/">Meal Plan</Link>. The app will pick meals for you and add the ingredients to your shopping list.</p>
          <p>Meals are randomly selected, but you'll be more likely to get meals you haven't seen in a while and less likely to get meals that don't fit your general preferences.</p>
          <p>You can review your meal plan and swap out recipes if you like. </p>
        </div>
      </div>
      <div className='instruction'>
        <div className="img_box smaller">
          <img class="smaller" src="https://res.cloudinary.com/sventerprise/image/upload/v1656012834/CT-amp/shopping_list_py15uk.png" alt="meal plan" />
        </div>
        <div className='copy'>
          <p><strong>What's next?</strong> We're coming at ya with a shopping list, that's what. Ingredients will be automatically added to the list. You can add other things if you like (you don't have to add motor oil to a recipe, if that's what you need).</p>           
        </div>
      </div>
    
    </div> 
  )
  
}

export default Dashboard