import React from 'react';
// import Navbar from './components/navbar/Navbar';
import Navbar from '../components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import { Recipe } from '../pages/recipe/Recipe';
import RecipeBox from '../pages/recipeBox/RecipeBox';
import { Account } from '../pages/account/Account';
import Donate from '../pages/donate/Donate';
import Register from '../pages/register/register';
import GetRegUser from '../components/getRegUser/getRegUser'
import Protected from '../components/Protected';
import MealPlan from '../pages/mealPlan/mealPlan';
import BottomNav from '../components/BottomNav'
import { Paper } from '@mui/material';
import { Container } from '@mui/system';
import Navbar2 from '../components/Navbar2'

function App() {
  return (
    < >
      <Navbar2/>
      <Container>
      <Routes>
        <Route children path='/account' element={<Account />}></Route>
        <Route children path='/register' element={<Register />}></Route>
        <Route children path='/recipe' element={<Protected>
          <Recipe />
        </Protected>} ></Route>
        <Route children path='/donate' element={<Donate />}></Route>
        <Route children path='/getreguser' element={<GetRegUser />}></Route>
        <Route children path='/recipe-box' element={<Protected>
          <RecipeBox />
          </Protected>} ></Route>
        <Route children path='/meal_plan'element={<Protected>
          <MealPlan/>
        </Protected>} ></Route>
        <Route children path='/' element={<Dashboard/>}></Route>
      </Routes>
      </Container>
      <BottomNav />
    </>
  );
}

export default App;
