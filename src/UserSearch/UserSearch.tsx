
// React hooks & dependencies
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";

// Static assets
import './UserSearch.module.css'

// Components
import SearchResultPreview from "./SearchResultPreview/SearchResultPreview";

// Context
import { apiContext } from "../App";

function UserSearch() {
    const [inputValue, setInputValue] = useState('')
    const [users, setUsers] = useState([])

    const requestError = useRef(false)

    const apiEndpoints: any = useContext(apiContext)

    const userSearchAPIendpoint = apiEndpoints['userSearchAPIendpoint']

    /**
     * Effects
     */
        // Send API query when user types in a name
        useEffect(() => {

            // Set a delay so that query is only sent when user is done typing
            const delayDebounceFn = setTimeout(() => {
                if (inputValue) {
                    let queryAPIendpoint: string = userSearchAPIendpoint(inputValue)
        
                    // Send request
                    axios.get(queryAPIendpoint)
                        .then(response => {
                            requestError.current = false
                            setUsers(response.data.items)                            
                        })
                        .catch(error => {
                            requestError.current = true
                            setUsers([])
                        })
                    
                }
            }, 1000)
            
            return () => {
                clearTimeout(delayDebounceFn)
            };
            
        }, [inputValue]);


    /**
     * Handlers
     */
        function handleUserSearchInputChange(event: any) {
            setInputValue(event.target.value)        
        }

    
    /**
     * Return statement
     */    
        if (users.length > 0) {
            return (
                <>
                    <input type="text" name="user-search_input" id="" value={inputValue} onChange={handleUserSearchInputChange} />
        
                    <div id="user-search_preview-box">
                        {users.map((user, index) => (
                            <SearchResultPreview key={index} user={user}/>
                        ))}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <input type="text" name="user-search_input" id="" value={inputValue} onChange={handleUserSearchInputChange} />
        
                    <div id="user-search_preview-box">
                        
                    </div>
                </>
            );
        }

}

export default UserSearch