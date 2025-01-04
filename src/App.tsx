// React hooks & dependencies
import { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

// Static assets
import './App.css'

// Components
import UserSearch from './UserSearch/UserSearch'
import RepoSearch from './RepoSearch/RepoSearch'

// Export the context to use in other components with empty object as default value
export const ApiContext = createContext({})
export const UserContext = createContext({})
export const AppContext = createContext({}) // Generic context for independent global variables and the like

function App() {
  const [user, setUser] = useState(null)
  const [AppConfig, setAppConfig] = useState({})

  const internalFocusTarget:any = useRef(null)

  const configFilePath = "../config.json"

  /**
   * Effects
   */

    // Handle optional use of config file
    useEffect(() => {
      // Set default configuration
      const defaultConfig = {
        "gitHub": {
          "request_params": {
              "headers": {
                  "Authorization": ""
              }
          }
        }
      }

      setAppConfig(defaultConfig)

      // Attempt to retrieve config from config file
      axios.get(configFilePath)
          .then(response => {
            // Ideally I'd like to check for the response code,
            // but React will always return a 200 status.
            // So instead I check to see if the response data contains 
            // a specific attribute would only be present in the config file
            if (response.data.isAvailible) {
              setAppConfig(response.data)
            }
            
          })
    }, []); // Runs only on mount

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

  /**
   * Context objects
   */

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

    // User state variable
    const userContextStateVariable = {
      'user': user, 
      'setUser': setUser
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
          <UserContext.Provider value={userContextStateVariable}>

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