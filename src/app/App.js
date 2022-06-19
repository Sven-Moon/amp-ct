import React from 'react';
// import Navbar from './components/navbar/Navbar';
import Navbar from '../components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import { Recipe } from '../pages/recipe/Recipe';
import { RecipeBox } from '../pages/recipeBox/RecipeBox';
import { Account } from '../pages/account/Account';
import Donate from '../pages/donate/Donate';
import Register from '../pages/register/register';
import GetRegUser from '../components/getRegUser/getRegUser'
import Protected from '../components/Protected';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route children path='/account' element={<Account />}></Route>
        <Route children path='/register' element={<Register />}></Route>
        <Route children path='/recipe' 
        element={<Protected><Recipe /></Protected>}>          
        </Route>
        <Route children path='/donate' element={<Donate />}></Route>
        <Route children path='/getreguser' element={<GetRegUser />}></Route>
        <Route children path='/recipe-box' element={<RecipeBox />}></Route>
        <Route children path='/' element={<Dashboard/>}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
