// React hooks & dependencies
import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Static assets
import styles from "./RepoSearch.module.css"

// Components
import RepoFilters from "./RepoFilters/RepoFilters";
import RepoListItem from "./RepoListItem/RepoListItem";

// Context
    // Imports
    import { ApiContext, UserContext } from "../App";

    // Exports
    export const SearchFilterVariablesContext = createContext({})

function RepoSearch() {
    const [repos, setRepos] = useState([])
    const [filteredRepos, setFilteredRepos] = useState([])
    const languages = useRef([])
    
    const apiEndpoints: any = useContext(ApiContext)
    const selectedUser: any = useContext(UserContext)

    const userReposAPIendpoint = apiEndpoints['userReposAPIendpoint']
    const selectedUserReposAPIendpoint = userReposAPIendpoint(selectedUser.user.login)

    /**
     * Search filter variables
     */

        // State variables
        const [nameFilter, setNameFilter] = useState("")
        const [languageFilter, setLanguageFilter] = useState("")

        // Object to pass as context
        const filterStateVariablesObject = {
            'name': {
                'value': nameFilter,
                'set': setNameFilter
            },

            'language': {
                'value': languageFilter,
                'set': setLanguageFilter
            }
        }

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
                            setFilteredRepos(repos)
                            
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

        // Update repos to show based on filters
        useEffect(() => {
            
            const matchingRepos: never[] = []

            const nameRegex = new RegExp(nameFilter, 'i')
            const languageRegex = new RegExp(languageFilter, 'i')
            

            for (let i = 0; i < repos.length; i++) {
                const repo = repos[i];

                if ((nameRegex.test(repo.name)) && (languageRegex.test(repo.language))) {
                    matchingRepos.push(repo)
                    
                }
            }

            setFilteredRepos(matchingRepos)

        }, [nameFilter, languageFilter])


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

                    {/* Search filters */}
                    <SearchFilterVariablesContext.Provider value={filterStateVariablesObject} >
                        <RepoFilters languages={languages.current}/>
                    </SearchFilterVariablesContext.Provider>

                    <div>
                        {filteredRepos.map((repo, index) => (
                            <RepoListItem key={index} repo={repo}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RepoSearch