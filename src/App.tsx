// React hooks & dependencies
import { createContext, useRef, useState } from 'react'

// Static assets
import './App.css'
import AppConfig from "../config.json"

// Components
import UserSearch from './UserSearch/UserSearch'
import RepoSearch from './RepoSearch/RepoSearch'

// Export the context to use in other components with empty object as default value
export const ApiContext = createContext({})
export const UserContext = createContext(null)
export const AppContext = createContext({}) // Generic context for independent global variables and the like

function App() {
  const [user, setUser] = useState(null)

  const internalFocusTarget = useRef(null)

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

    // Utils
    const appContextUtils = {
      'internalFocusTarget': internalFocusTarget,
      'appConfig': AppConfig
    }
  
  /**
   * Handlers
   */
    
    // Run when a click is made in the page
    function handleGlobalClick(e:any) {
      // Check if click target is equal to internalFocusTarget, if not, reset
      // This is for when I want an element to hide if I click outside of it (like a dropdown menu)
      
      if (internalFocusTarget.current !== e.target) {
        switch (internalFocusTarget.current.dataset.bluraction) {
          case 'hide':
            internalFocusTarget.current.style.display = 'none'
            internalFocusTarget.current = e.target
            break;
        
          default:
            break;
        }
      }
    }

  return (
    <div ref={internalFocusTarget} onClick={handleGlobalClick} style={{height:'100vh'}}>
      <AppContext.Provider value={appContextUtils}>
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
      </AppContext.Provider>
    </div>
  )
}

export default App