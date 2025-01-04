// React hooks & dependencies
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Static assets
import styles from './SearchResultPreview.module.css'

// Components


// Context
import { UserContext, AppContext } from '../../App';


function SearchResultPreview({ user }:any) {

    const [repoAmount, setRepoAmount] = useState(0)
    
    const selectedUser: any = useContext(UserContext)
    const appUtils: any = useContext(AppContext)

    /**
     * Effects
     */
        // Send API query when user types in a name
        useEffect(() => {

            const params = appUtils.appConfig.gitHub.request_params

            // Get amount of repositories of user
            axios.get(user.repos_url, params)
                        .then(response => {
                            setRepoAmount(response.data.length)                                             
                        })
                        .catch(_error => {
                            setRepoAmount(0) 
                        })
            
        }, []); // Runs only on mount
    
    /**
     * Handlers
     */
        // Change user state of the whole page
        function selectUserHandler() {
            selectedUser.setUser(user)
        }

    return (
        <div className={styles.resultPreview_wrapper} onClick={selectUserHandler}>
            {/* Image */}
            <div className={styles.resultPreview_imgWrapper}>
                <img src={user.avatar_url} alt="Profile Picture" />
            </div>

            {/* Info */}
            <div className={styles.resultPreview_infoWrapper}>
                <div className={styles.resultPreview_nameWrapper}>
                    <p className={styles.resultPreview_name}>{user.login}</p>
                    <p className={styles.resultPreview_repoAmount}>{ repoAmount } repositories</p>
                </div>
            </div>
        </div>
    );
}

export default SearchResultPreview