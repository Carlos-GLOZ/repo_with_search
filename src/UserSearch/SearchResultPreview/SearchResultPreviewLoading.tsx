// Static assets
import styles from './SearchResultPreview.module.css'


function SearchResultPreviewLoading() {
    return (
        <div className={styles.resultPreviewLoading_wrapper}>
            {/* Image */}
            <div className={styles.resultPreviewLoading_imgWrapper}>
                <div></div>
            </div>

            {/* Info */}
            <div className={styles.resultPreviewLoading_infoWrapper}>
                <div className={styles.resultPreviewLoading_nameWrapper}>
                    <p className={styles.resultPreviewLoading_name}></p>
                    <p className={styles.resultPreviewLoading_repoAmount}></p>
                </div>
            </div>
        </div>
    );
}

export default SearchResultPreviewLoading