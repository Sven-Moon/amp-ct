import { useState, createContext } from 'react'


const DataProvider = (props) => {

  const [regUser, setRegUser] = useState({ 
    'id': '', 'username': '', 'access-token': ''
  })
  const [messages, setMessages] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [filters, setFilters] = useState({
    created_by: regUser.username,
    prep_time: null,
    cook_time: null,
    categories: null,
    meal_types: '123',
    last_made: null, // pass a number of days (2w = 14d, etc)
    rating: null,
    average_cost_rating: '123'
  })

  let appState = {
    'regUser': regUser, 
    'setRegUser': setRegUser,
    'messages': messages, 
    'setMessages': setMessages,
    'isLoggedIn': isLoggedIn,
    'setIsLoggedIn': setIsLoggedIn,
    'filters': filters,
    'setFilters': setFilters,
  }

  return (
    <DataContext.Provider value={appState}>
      {props.children}
    </DataContext.Provider>
  )
}
export default DataProvider
export let DataContext = createContext()