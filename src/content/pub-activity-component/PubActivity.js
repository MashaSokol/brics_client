import React, { Component } from 'react'
import './PubActivity.css';

class PubActivity extends Component {
    render() {
        return (
            <div>
                <div className="pub-width-80 pub-flex-container pub-margin-top-5 pub-margin-auto">
                    <div className="pub-margin-left-auto pub-title">Публикационная активность</div>
                </div>
                <div className="pub-width-100 pub-flex-container pub-justify-center">
                    <div className="pub-line-div"></div>
                </div>
          </div>
        )
    }
}

export default PubActivity