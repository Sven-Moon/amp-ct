import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { DataContext } from '../../Providers/DataProvider';


const Navbar = () => {
  const auth = useAuth()
  const {status, data: user} = useUser()
  const {setRegUser} = useContext(DataContext)
  const navigate = useNavigate()

  const sign_in = async () => {
    const provider = new GoogleAuthProvider()
    let u = await signInWithPopup(auth, provider)   
    if (u) {
      console.log(u) 
      let url = `http://localhost:5000/api/v1/user/email`
      await fetch(`${url}/${u.user.email}`)
        .then(data =>{ 
          console.log(data)
          console.log('NOT 200 check: ',data.status !== 200);
          if (data.status !== 200) {
            navigate('/register')
          } else {
            console.log('navbar data (no json)',data)
            data = data.json()
            console.log('navbar data (json w/in else)',data)
            return data
          }
        })
        .then((data) => {
          console.log('navbar data (json)', data)
          setRegUser({ id: data.id, username: data.username})
          navigate('/')
      })
      .catch((e) => {
        console.log(e)
        navigate('register')
      })     
    }    
  }

  const sign_out = async () => {
    await signOut(auth)
    navigate('/')
    console.log('signed user out', user) 
  }

  return (
    <nav>
    <div className="nav1">
      <Link to='/' className="logo" >AMP</Link>
      <div className="nav-container">
        <ul className='nav-links'>
          <li className='link'>My Meal Plan</li>
          <li className='link'><Link to="/recipe-box">My Recipes</Link></li>
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
        <Link to="/"><img className='avatar' src={user ? user.photoURL: null} alt="user" /></Link>
      : null }
    </div>
    <div className="nav2">
        <Link className='link pay-me' to='/donate'>Motivate Me!</Link>
    </div>
    
    </nav>
  );
}
export default Navbar
