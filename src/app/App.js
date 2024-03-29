import React from 'react';
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
import { Container } from '@mui/system';
import Navbar from '../components/Navbar'

function App() {
  return (
    < >
      <Navbar></Navbar>
      <Container sx={{minHeight: 70+'%', marginTop: 60+'px', display:'flex', justifyContent:'center'}}>
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
      {/* <BottomNav /> */}
    </>
  );
}

export default App;
