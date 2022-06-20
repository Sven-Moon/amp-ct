import { useUser } from 'reactfire'
import { DataContext } from '../../app/Providers/DataProvider'; 
import { useEffect, useContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const GetRegUser = () => {

  const { data: user } = useUser()
  const { setRegUser } = useContext(DataContext)
  const { messages, setMessages } = useContext(DataContext)
  const { isLoggedIn, setIsLoggedIn } = useContext(DataContext)
  
  

  useEffect(() => {determineStatus()}, [])
  const navigate = useNavigate()

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

  const determineStatus = async () => {
    if (!user) <Navigate to='/login' />
    else if (!isLoggedIn) 
      await getRegUser()
    else {
      navigate('/')
    }
  }

    
    
  return (<div>Retrieving User Data</div>)
}

export default GetRegUser