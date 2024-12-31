// React hooks & dependencies
import { createContext } from 'react'

// Static assets
import './App.css'

// Components
import UserSearch from './UserSearch/UserSearch'

// Export the context to use in other components with empty object as default value
export const apiContext = createContext({})

function App() {

  // API endpoint for user search
  function userSearchAPIendpoint(q:string): string {
    return `https://api.github.com/search/users?q=${q}`
  }

  // Collect API endpoints to pass to other components through context
  const apiEndpoints = {
    'userSearchAPIendpoint': userSearchAPIendpoint,
  }

  return (
    <>
      <apiContext.Provider value={apiEndpoints}>
        <UserSearch />
      </apiContext.Provider>
    </>
  )
}

export default App