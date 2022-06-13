import React from 'react';
// import Navbar from './components/navbar/Navbar';
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import { Recipe } from '../pages/recipe/Recipe';
import { Account } from '../pages/account/Account';
import Donate from '../pages/donate/Donate';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route children path='/' element={<Dashboard/>}></Route>
        <Route children path='/recipe' element={<Recipe />}></Route>
        <Route children path='/account' element={<Account />}></Route>
        <Route children path='/donate' element={<Donate />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
