import React from 'react';

import FacebookActions from '../actions/FacebookActions';

class FacebookDownloadPicture extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h5>Download Picture:</h5>
                <button ref="downloadPictureButton" onClick={() => this.didClickDownloadPicture()}>Download FB Picture</button>
            </div>
        )
    }

    didClickDownloadPicture() {
        FacebookActions.getFacebookProfilePicture(this.props.userId);
    }
}

export default FacebookDownloadPicture;
