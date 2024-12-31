// React hooks & dependencies
import { createContext, useState } from 'react'

// Static assets
import './App.css'

// Components
import UserSearch from './UserSearch/UserSearch'

// Export the context to use in other components with empty object as default value
export const ApiContext = createContext({})
export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)

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
      <ApiContext.Provider value={apiEndpoints}>
        <UserContext.Provider value={{user, setUser}}>

          {/* If there's no user set, show user search */}
          {!user ? 
            /* Search */
            <UserSearch /> : 

            <></>
          }
            
        </UserContext.Provider>
      </ApiContext.Provider>
    </>
  )
}

export default App