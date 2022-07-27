import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { DataContext } from '../../app/Providers/DataProvider';
import { useEffect } from 'react';

const Navbar = () => {
  const auth = useAuth()
  const { status, data: user } = useUser()
  const { isLoggedIn, setIsLoggedIn, regUser, setRegUser, setUserRecipes,
    messages, setMessages } = useContext(DataContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !isLoggedIn)
      getRegUser()
  }, [user])
  useEffect(() => { if (isLoggedIn) getRegUserRecipes() }, [isLoggedIn])

  const sign_in = async () => {
    const provider = new GoogleAuthProvider()
    let u = await signInWithPopup(auth, provider)
    if (u) {
      console.log(u)
      let url = `https://amp-ct-api.herokuapp.com/api/v1/user/reg`
      await fetch(`${url}/${u.user.email}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('User Not Found')
          }
        })
        .then((data) => {
          setRegUser({
            id: data.user.id,
            username: data.user.username,
            'access-token': data.user['access-token']
          })
          setIsLoggedIn(true)
          navigate('/')
        })
        .catch(e => {
          console.log(e)
          navigate('register')
        })
    }
  }

  const sign_out = async () => {
    await signOut(auth)
    setIsLoggedIn(false)
    setRegUser({
      'id': '',
      'username': '',
      'access-token': ''
    })
    navigate('/')
    console.log('signed user out', user)
  }


  const getRegUser = async () => {
    await fetch(`https://amp-ct-api.herokuapp.com/api/v1/user/reg/${user.email}`)
      .then(resp => {
        if (resp.ok) return resp.json()
        else throw new Error('User not registered')
      })
      .then(data => {
        setRegUser({
          id: data.user.id,
          username: data.user.username,
          'access-token': data.user['access-token']
        })
        setIsLoggedIn(true)
        navigate('/')
      })
      .catch((e) => {
        setMessages([...messages, 'could not find user in registered users'])
        console.log(e)
        navigate('/register')
      })
  }

  const displayMessages = (m, i) => {
    return <li key={i}>{m}</li>
  }

  async function getRegUserRecipes() {
    let url = `https://amp-ct-api.herokuapp.com/api/v1/recipes/recipebox/${regUser.username}`
    let options = {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, options)
      .then(resp => {
        if (resp.ok) return resp.json()
        else throw Error('Could not find recipes with that username')
      })
      .then(data => {
        setUserRecipes(createUserRecipeObject(data.recipes))
      })
      .catch((e) => {
        setMessages([...messages], e.message)
      })
  }

  function createUserRecipeObject(userRecipesArray) {
    let urObj = {}
    for (let recipe of userRecipesArray) {
      urObj[recipe.id] = recipe
    }
    return urObj
  }

  return (
    <nav>
      <div className="nav1">
        <Link to='/' className="logo" >AMP</Link>
        <div className="nav-container">
          <ul className='nav-links'>
            <li className='link'><Link to="/meal_plan">My Meal Plan</Link></li>
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
        {user ?
          <Link to="/"><img className='avatar' src={user ? user.photoURL : null} alt="user" /></Link>
          : null}
      </div>
      <div className="nav2">
        <ul>
          {Object.values(messages).map((m, i) => displayMessages(m, i))}
        </ul>
        <Link className='link pay-me' to='/donate'>Motivate Me!</Link>
      </div>

    </nav>
  );
}
export default Navbar
