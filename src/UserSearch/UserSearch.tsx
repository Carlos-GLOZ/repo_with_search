
// React hooks & dependencies
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";

// Static assets
import styles from "./UserSearch.module.css"

// Components
import SearchResultPreview from "./SearchResultPreview/SearchResultPreview";

// Context
import { ApiContext, AppContext } from "../App";
import SearchResultPreviewLoading from "./SearchResultPreview/SearchResultPreviewLoading";

function UserSearch() {
    const [inputValue, setInputValue] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const requestError = useRef(false)

    const apiEndpoints: any = useContext(ApiContext)
    const appUtils: any = useContext(AppContext)

    const userSearchAPIendpoint = apiEndpoints['userSearchAPIendpoint']

    const inputDelay = 500;

    /**
     * Effects
     */
        // Send API query when user types in a name
        useEffect(() => {

            if (inputValue) {
                setLoading(true)
            } else {
                setLoading(false)
            }

            // Set a delay so that query is only sent when user is done typing
            const delayDebounceFn = setTimeout(() => {
                if (inputValue) {
                    let queryAPIendpoint: string = userSearchAPIendpoint(inputValue)

                    
            
                    // Try to retrieve request parameters, default to empty object if impossible
                    let params: object;
                    try {
                        params = appUtils.appConfig.gitHub.request_params
                    } catch (error) {
                        params = {}
                    }
        
                    // Send request
                    axios.get(queryAPIendpoint, params)
                        .then(response => {
                            requestError.current = false
                            setUsers(response.data.items)  
                            setLoading(false)                          
                        })
                        .catch(_error => {
                            requestError.current = true
                            setUsers([])
                            setLoading(false)
                        })
                    
                }
            }, inputDelay)
            
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
        if (loading) {
            return (
                <div className={styles.userSearch_wrapper}>
                    <div className={styles.userSearch_container}>
                        <input type="text" name="user-search_input" id={styles.userSearch_input} value={inputValue} onChange={handleUserSearchInputChange} placeholder="Username"/>
            
                        <div id={styles.userSearch_previewBox} style={{overflowY: "hidden"}}>
                            {/* Loading gif */}
                            <div >
                                <SearchResultPreviewLoading />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (users.length > 0 && inputValue != '') {
            return (
                <div className={styles.userSearch_wrapper}>
                    <div className={styles.userSearch_container}>
                        <input type="text" name="user-search_input" id={styles.userSearch_input} value={inputValue} onChange={handleUserSearchInputChange} placeholder="Username"/>
            
                        <div id={styles.userSearch_previewBox}>
                            {users.map((user, index) => (
                                <SearchResultPreview key={index} user={user}/>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.userSearch_wrapper}>
                    <div className={styles.userSearch_container}>
                        <input type="text" name="user-search_input" id={styles.userSearch_input} value={inputValue} onChange={handleUserSearchInputChange} placeholder="Username"/>
            
                        <div id={styles.userSearch_previewBox}>
                            
                        </div>
                    </div>
                </div>
            );
        }

}

export default UserSearch