import React from 'react';
import Axios from 'axios';
import moment from 'moment';

import Loading from './Loading';

import './Story.css';

class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            story: []
        }
    }

    componentDidMount() {
        const storyId = this.props.storyId;
        const storyURI = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`;
        Axios.get(storyURI).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    story: response.data
                });
            }
        )
        .catch(
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, story } = this.state;
        if (error) {
            return <div><strong>Error:</strong> {error.message}</div>
        } else if (!isLoaded) {
            return <Loading />
        } else {
            // const story = this.props.data;
            const storyId = this.props.storyId;
            const storyUri = `https://news.ycombinator.com/item?id=${storyId}`;
            const storyLink = (story.url) ? story.url : storyUri;

            return (
                <li className="Story" id={storyId}>
                    <div className="StoryTitle">
                        <a className="StoryLink" href={storyLink}>
                            {story.title}
                        </a>
                    </div>
                    <div className="StoryMeta">
                        <span className="StoryScore">
                            {story.score}
                        </span>
                        <span className="StoryBy">
                            {story.by}
                        </span>
                        <a className="StoryTime StorySourceLink" href={storyUri} target="_blank" title="Show source story..." rel="noopener noreferrer">
                            {timeSince(story.time)}
                        </a>
                    </div>
                </li>
            );
        }
    }
}

function timeSince(thetime) {
    const oneWeekAgo = moment().subtract(7, 'days');
    const time = moment.unix(thetime);
    if (time.isAfter(oneWeekAgo)) {
        return time.fromNow();
    }
    return time.format('lll');
}

export default Story;