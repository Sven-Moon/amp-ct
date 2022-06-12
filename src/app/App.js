import React from 'react';
// import Navbar from './components/navbar/Navbar';
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import { Recipe } from '../pages/Recipe';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route children path='/' element={<Dashboard/>}></Route>
        <Route children path='/recipe' element={<Recipe title='Your Recipe' />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
