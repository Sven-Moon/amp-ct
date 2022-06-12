import { useFirebaseApp } from "reactfire"
import { getAuth } from "firebase/auth"
import App from '../App'
import DataProvider from "./DataProvider"

export const ProviderLayer = () => {
  const app = useFirebaseApp()
  // const auth = getAuth(app)
    
  return (
    <DataProvider>
      <App></App>
    </DataProvider>
  )
}