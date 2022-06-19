import { useState, createContext } from 'react'


const DataProvider = (props) => {

  const [regUser, setRegUser] = useState({ 
    'id': '', 
    'username': '', 
    'access-token': ''
  })
  const [messages, setMessages] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  let appState = {
    'regUser': regUser, 
    'setRegUser': setRegUser,
    'messages': messages, 
    'setMessages': setMessages,
    'isLoggedIn': isLoggedIn,
    'setIsLoggedIn': setIsLoggedIn    
  }

  return (
    <DataContext.Provider value={appState}>
      {props.children}
    </DataContext.Provider>
  )
}
export default DataProvider
export let DataContext = createContext()