import { useState, createContext } from 'react'


const DataProvider = (props) => {

  const [regUser, setRegUser] = useState({ id: '', username: '' })
  const [messages, setMessages] = useState([])

  let appState = {
    'regUser': regUser, 
    'setRegUser': setRegUser,
    'messages': messages, 
    'setMessages': setMessages
  }

  return (
    <DataContext.Provider value={appState}>
      {props.children}
    </DataContext.Provider>
  )
}
export default DataProvider
export let DataContext = createContext()