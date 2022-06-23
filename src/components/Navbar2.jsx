import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { DataContext } from '../app/Providers/DataProvider'
import { useEffect } from 'react';
import { blueGrey } from '@mui/material/colors';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


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
      let url = `http://localhost:5000/api/v1/user/reg`
      await fetch(`${url}/${u.user.email}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('User Not Found')
          }
        })
        .then((data) => {
          console.log('data (nav)', data)
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
    handleCloseUserMenu()
  }


  const getRegUser = async () => {
    await fetch(`http://localhost:5000/api/v1/user/reg/${user.email}`)
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
    let url = `http://localhost:5000/api/v1/recipes/recipebox/${regUser.username}`
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
    <AppBar position="fixed" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AMP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu 
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}           
            >
              <MenuItem key={'meal_plan'} onClick={handleCloseNavMenu}>
                <Link to={"/meal_plan"}><Typography color={blueGrey[700]} textAlign="center">{"Meal Plan"}</Typography></Link>
              </MenuItem>
              <MenuItem key={'recipebox'} onClick={handleCloseNavMenu} >
                <Link to={"/recipe-box"}><Typography color={blueGrey[700]} textAlign="center">{"Recipe Box"}</Typography></Link>
              </MenuItem>
              <MenuItem key={'recipe'} onClick={handleCloseNavMenu}>
                <Link to={"/recipe"}><Typography color={blueGrey[700]} textAlign="center">{"Author a Recipe"}</Typography></Link>
              </MenuItem>
              <MenuItem key="settings">
                <Link to="/donate">
                  <Typography color={blueGrey[700]} textAlign="center">Donate</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AMP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Link
              to="/meal_plan"
                key={'meal_plan'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Meal Plan"}
              </Link>
              <Link
              to="/recipe-box"
                key={'recipe-box'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Recipe Box"}
              </Link>
              <Link
              to="/recipe"
                key={'recipe'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Make a Recipe"}
              </Link>
              <Link
              to="/donate"
                key={'donate'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Donate"}
              </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {user ?                
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.displayName} src={user?.photoURL} />
              </IconButton>
                :
                <MenuItem key="sign_in" onClick={sign_in}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>}
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
            <MenuItem key="account" onClick={handleCloseUserMenu}>
              <Typography color={blueGrey[700]} textAlign="center">Account</Typography>
            </MenuItem>
              <MenuItem key="settings">
              <Typography color={blueGrey[700]} textAlign="center">Settings (not yet)</Typography>
            </MenuItem>
              <MenuItem key="signout" onClick={sign_out}>
              <Typography color={blueGrey[700]} textAlign="center">Log Out</Typography>
            </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
