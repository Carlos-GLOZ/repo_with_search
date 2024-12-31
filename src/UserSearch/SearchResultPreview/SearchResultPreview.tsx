// React hooks & dependencies

// Static assets
import './SearchResultPreview.module.css'

// Components


// Context


function SearchResultPreview({ user }) {
    

    return (
        <div className='result-preview_wrapper'>
            {/* Image */}
            <div className="result-preview_img-wrapper">
                <img src={user.avatar_url} alt="Profile Picture" />
            </div>

            {/* Info */}
            <div className="result-preview_info-wrapper">
                <div className="result-preview_name-wrapper">
                    <p className="result-preview_name">{user.login}</p>
                </div>
            </div>
        </div>
    );
}

export default SearchResultPreview