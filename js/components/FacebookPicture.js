import React from 'react';

import ActionTypes from '../constants';

export default class FacebookPicture extends React.Component {
    constructor(props) {
        super(props);
    }

    get facebookStatus() {
        let msg;

        if (this.props.facebookPictureStatus === ActionTypes.FACEBOOK_GETTING_PICTURE) {
            msg = 'Downloading picture...'
        }

        if (this.props.facebookPictureStatus === ActionTypes.FACEBOOK_RECEIVED_PICTURE) {
            msg = 'Received picture!'
        }

        return <h3>{msg}</h3>;
    }

    get facebookPicture() {
        if (this.props.facebookPictureUrl) {
            return <img src={this.props.facebookPictureUrl}></img>;
        }
    }

    render() {
        return (
                <div>
                    {this.facebookStatus}
                    {this.facebookPicture}
                </div>
        );
    }
}
