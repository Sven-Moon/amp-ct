import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from 'reactfire'
import { DataContext } from '../app/Providers/DataProvider'

const Protected = ({children}) => {
  const { data: user } = useUser()
  const { isLoggedIn } = useContext(DataContext)


  if (!user) 
    return <Navigate to="/login" replace />  
  else if (!isLoggedIn) {
    return <Navigate to="/getreguser" replace />
  } else 
    return children
}
export default Protected