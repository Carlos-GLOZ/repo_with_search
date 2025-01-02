// React hooks & dependencies

// Static assets
import { useContext, useRef, useState } from "react";
import styles from "./RepoFilters.module.css"
import arrowDownIcon from "../../assets/caret-down-solid.svg"

// Components

// Context
import { SearchFilterVariablesContext } from "../RepoSearch";
import { AppContext } from "../../App";

function RepoFilters(props:any) {
    const [selectedLanguage, setSelectedLanguage] = useState('')

    const languages = props.languages || []

    const searchFilterVariablesContext: any = useContext(SearchFilterVariablesContext)
    const appUtils: any = useContext(AppContext)

    const languageSelectorButton = useRef(null)
    const languageSelectorOptions = useRef(null)

    /**
     * Handlers
     */
        // Change value of name state variable
        function handleNameInputChange(e:any) {
            searchFilterVariablesContext.name.set(e.target.value)
        }

        // Show language options
        function handleLanguageSelect(e:any) {
            if (getComputedStyle(languageSelectorOptions.current).display == 'none') {
                
                languageSelectorOptions.current.style.display = 'flex'
                
                setTimeout(() => {
                    appUtils.internalFocusTarget.current = languageSelectorOptions.current
                }, 100);
            }
        }

        // Select language option
        function handleLanguageInputChange(e:any) {
            // Change visibility
            languageSelectorOptions.current.style.display = 'none'

            searchFilterVariablesContext.language.set(e.target.value)
            setSelectedLanguage(e.target.value)
        }
    
    return (
        <div className={styles.repoFilters_wrapper}>

            {/* Name search */}
            <input type="text" placeholder="Find a repository..." className={styles.repoFilters_name} onChange={handleNameInputChange}/>

            {/* Language search */}
            <div className={styles.repoFilters_language}>

                <button value={selectedLanguage} onClick={handleLanguageSelect} ref={languageSelectorButton} className={styles.repoFilters_selectedLanguage}>{selectedLanguage || 'All'} <img src={arrowDownIcon} alt="arrow-down-icon"/></button>

                <div id={styles.repoFilters_language_optionContainer} ref={languageSelectorOptions} data-bluraction='hide'>
                    <button value="" onClick={handleLanguageInputChange} className={styles.repoFilters_language_option}>All</button>
                    {
                        languages.map((language:string, index:number) => (
                            <button key={index} value={language} onClick={handleLanguageInputChange} className={styles.repoFilters_language_option}>{language}</button>
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default RepoFilters