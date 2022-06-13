import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useUser } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'


const Navbar = () => {
  const auth = useAuth()
  const {status, data: user} = useUser()

  const sign_in = async () => {
    const provider = new GoogleAuthProvider()
    let u = await signInWithPopup(auth, provider)   
    console.log(u) 
  }

  const sign_out = async () => {
    await signOut(auth)
    console.log('signed user out', user) 
  }

  return (
    <nav>
    <div className="nav1">
      <div className="logo">AMP</div>
      <div className="nav-container">
        <ul className='nav-links'>
          <li className='link'>My Meal Plan</li>
          <li className='link'>My Recipes</li>
          <li className='link'>Buy Me a Coffee</li>
          <li className='link'><Link to="/recipe">Create a recipe</Link></li>
        </ul>
        <ul className='link account-links'>
        {
          status === 'loading' ? 
          <li>Loading...</li>
          : user 
          ?
            <React.Fragment>
              <li>Welcome, {user.displayName}!</li>
              <li><button onClick={sign_out}>Sign Out</button></li>
            </React.Fragment>
          :
          <li><button onClick={sign_in}>Sign In</button></li>
        }          
        </ul>
      </div>
      { user ?       
        <Link to="/"><img className='avatar' src={user?.photoURL} alt="user" /></Link>
      : null }
    </div>
    <div className="nav2">
        <Link className='link pay-me' to='/'>Buy me a coffee</Link>
    </div>
    
    </nav>
  );
}
export default Navbar
