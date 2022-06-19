import { Navigate } from 'react-router-dom'

const Protected = ({isLoggedIn, children}) => {
  if (!isLoggedIn) {
    return <Navigate to="/register" replace />
  }
  return children
}
export default Protected