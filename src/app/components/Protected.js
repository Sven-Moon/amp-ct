import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from 'reactfire'
import { DataContext } from '../Providers/DataProvider'

const Protected = ({next, children}) => {
  const { data: user } = useUser()
  const { isLoggedIn } = useContext(DataContext)


  if (!user) 
    return <Navigate to="/login" replace />  
  else if (!isLoggedIn) {
    console.log('protected next', next)
    return <Navigate to="/getreguser" replace />
  } else 
    return children
}
export default Protected