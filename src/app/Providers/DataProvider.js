import { useState, createContext } from 'react'


const DataProvider = (props) => {

  let appState = {}

  return (
    <DataContext.Provider value={appState}>
      {props.children}
    </DataContext.Provider>
  )
}
export default DataProvider
export let DataContext = createContext()