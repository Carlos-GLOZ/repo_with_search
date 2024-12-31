// React hooks & dependencies
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Static assets
import styles from "./RepoSearch.module.css"

// Components

// Context
import { ApiContext, UserContext } from "../App";
import RepoListItem from "./RepoListItem/RepoListItem";

function RepoSearch() {
    const [repos, setRepos] = useState([])
    const languages = useRef([])
    
    const apiEndpoints: any = useContext(ApiContext)
    const selectedUser: any = useContext(UserContext)

    const userReposAPIendpoint = apiEndpoints['userReposAPIendpoint']
    const selectedUserReposAPIendpoint = userReposAPIendpoint(selectedUser.user.login)

    /**
     * Effects
     */
        // Send API query when user types in a name
        useEffect(() => {            

            // Get amount of repositories of user
            axios.get(selectedUserReposAPIendpoint)
                        .then(response => {
                            const repos = response.data

                            setRepos(repos)
                            
                            for (let i = 0; i < repos.length; i++) {
                                const repo = repos[i];
                                
                                // Add language to list of languages if not present
                                languages.current.indexOf(repo.language) === -1 ? languages.current.push(repo.language) : null
                            }
                            
                        })
                        .catch(error => {
                            setRepos([])
                        })
            
        }, []); // Runs only on mount



    /**
     * Handlers
     */
    function handleClickVisitButton() {
        window.open(selectedUser.user.html_url, '_blank').focus();
    }


    return (
        <div className={styles.repoSearch_wrapper}>
            <div className={styles.repoSearch_container}>

                {/* User info */}
                <div className={styles.repoSearch_userInfo_container}>
                    <img src={selectedUser.user.avatar_url} alt="profile picture"/>

                    <p className={styles.repoSearch_userInfo_name}>{selectedUser.user.login}</p>

                    <button className={styles.repoSearch_userInfo_visitButton} onClick={handleClickVisitButton}>Visit profile</button>
                </div>

                {/* Repository list */}
                <div className={styles.repoSearch_repoList_container}>
                    {repos.map((repo, index) => (
                        <RepoListItem key={index} repo={repo}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RepoSearch