// React hooks & dependencies
import { createContext, useState } from 'react'

// Static assets
import './App.css'

// Components
import UserSearch from './UserSearch/UserSearch'
import RepoSearch from './RepoSearch/RepoSearch'

// Export the context to use in other components with empty object as default value
export const ApiContext = createContext({})
export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)

  /**
   * API endpoints
   */

    // User search
    function userSearchAPIendpoint(q:string): string {
      return `https://api.github.com/search/users?q=${q}`
    }

    // User's repositories
    function userReposAPIendpoint(username:string): string {
      return `https://api.github.com/users/${username}/repos`;
    }

    // Collect API endpoints to pass to other components through context
    const apiEndpoints = {
      'userSearchAPIendpoint': userSearchAPIendpoint,
      'userReposAPIendpoint': userReposAPIendpoint
    }

  return (
    <>
      <ApiContext.Provider value={apiEndpoints}>
        <UserContext.Provider value={{'user': user, 'setUser': setUser}}>

          {/* If there's no user set, show user search */}
          {!user ? 
            /* Search */
            <UserSearch /> : 

            <RepoSearch />
          }
            
        </UserContext.Provider>
      </ApiContext.Provider>
    </>
  )
}

export default App