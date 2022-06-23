import { Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'


const Dashboard = () => {
  
  return (

    <div className="dashboard_box">
      <div className='hero'>
        <h1>STOP planning your meals!</h1>
        <h4>Let us do that for you.</h4>
      </div>
      <div className='instruction'>
        <img src="" alt="" />
        <div className='copy'>
          Start off by selecting some of the available recipes. (Be sure to select enough recipes per meal to get to your next trip to the store!) 
        </div>
      </div>
      <div className='instruction'>
        <div className='copy'>
          <p>Then, head over to your meal plan. The app will pick meals for you and add the ingredients to your shopping list.</p>
          <p>Meals are randomly selected, but you'll be more likely to get meals you haven't seen in a while and less likely to get meals that don't fit your general preferences.</p>
          <p>You can review your meal plan and swap out recipes if you like. </p>
           
        </div>
        <img src="" alt="" />
      </div>
    
    </div> 
  )
  
}

export default Dashboard