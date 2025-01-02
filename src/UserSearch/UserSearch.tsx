
// React hooks & dependencies
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";

// Static assets
import styles from "./UserSearch.module.css"
import loadingGif from "../assets/loading.gif"

// Components
import SearchResultPreview from "./SearchResultPreview/SearchResultPreview";

// Context
import { ApiContext } from "../App";
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
        
                    // Send request
                    axios.get(queryAPIendpoint)
                        .then(response => {
                            requestError.current = false
                            setUsers(response.data.items)  
                            setLoading(false)                          
                        })
                        .catch(error => {
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
                            {/* <SearchResultPreview key="1" user={ {avatar_url: "https://avatars.githubusercontent.com/u/102754279?v=4", login: "User", repos_url: "https://api.github.com/users/Carlos-GLOZ/repos"} }/>
                            <SearchResultPreview key="2" user={ {avatar_url: "https://avatars.githubusercontent.com/u/102754279?v=4", login: "User", repos_url: "https://api.github.com/users/Carlos-GLOZ/repos"} }/>
                            <SearchResultPreview key="2" user={ {avatar_url: "https://avatars.githubusercontent.com/u/102754279?v=4", login: "User", repos_url: "https://api.github.com/users/Carlos-GLOZ/repos"} }/>
                            <SearchResultPreview key="2" user={ {avatar_url: "https://avatars.githubusercontent.com/u/102754279?v=4", login: "User", repos_url: "https://api.github.com/users/Carlos-GLOZ/repos"} }/>
                            <SearchResultPreview key="2" user={ {avatar_url: "https://avatars.githubusercontent.com/u/102754279?v=4", login: "User", repos_url: "https://api.github.com/users/Carlos-GLOZ/repos"} }/> */}
                        </div>
                    </div>
                </div>
            );
        }

}

export default UserSearch