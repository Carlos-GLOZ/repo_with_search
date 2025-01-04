// React hooks & dependencies

// Static assets
import styles from "./RepoListItem.module.css"
import languageColorsObject from "../../assets/repo_language_colors.json"

// Components

// Context


function RepoListItem({ repo }:any) {

    // Strongly type language colors to stop TS from complaining
    const languageColors: { [key:string]:string } = languageColorsObject
    const languageColor = languageColors[repo.language]

    function Capitalize(s:string) {
        return s[0].toUpperCase() + s.slice(1);
    }
    
    return (
        <div className={styles.repoListItem_wrapper}>
            <div className={styles.repoListItem_container}>

                <div className={styles.repoListItem_title}>
                    <a href={repo.html_url} target="_blank" className={styles.repoListItem_title_name}>{repo.name}</a>

                    <p className={styles.repoListItem_title_visibility}>
                        {Capitalize(repo.visibility)}
                    </p>
                </div>

                <div className={styles.repoListItem_info}>
                    <div className={styles.repoListItem_info_languageColor} style={{backgroundColor:languageColor}}></div>
                    <p className={styles.repoListItem_info_language}>{repo.language}</p>
                </div>

            </div>
        </div>
    );
}

export default RepoListItem