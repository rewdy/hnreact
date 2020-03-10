import React from 'react';
import Axios from 'axios';

import Story from './Story';
import Loading from './Loading';

import './StoryList.css';

class StoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            limit: 20,
            offset: 0,
            scrollTrigger: 0,
            storyIdStore: []
        }
    }

    componentDidMount() {
        // do api call
        const storyListURI = "https://hacker-news.firebaseio.com/v0/topstories.json";
        console.log('Component mounted; getting story id list.');
        Axios.get(storyListURI).then(
            (response) => {
                this.setState({
                    storyIdStore: response.data,
                    isLoaded: true
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
        );

        let scrollBuffer = null;
        const componentScope = this;
        window.addEventListener('scroll', function(e) {
            clearTimeout(scrollBuffer);
            scrollBuffer = setTimeout(function() {
                if (componentScope.checkForUpdate()) {
                    componentScope.updateStories();
                }
            }, 150);
        });
    }

    checkForUpdate() {
        const winBottom = window.scrollY + window.innerHeight;
        return winBottom >= (document.body.clientHeight-400);
    }

    updateStories() {
        const limit = this.state.limit + 20;
        this.setState({
            limit: limit
        });
    }

    render() {
        const { error, isLoaded, storyIdStore, offset, limit } = this.state;
        if (error) {
            return <div><strong>Error:</strong> {error.message}</div>
        } else if (!isLoaded) {
            return <Loading />
        } else {
            const storyIds = storyIdStore.slice(
                offset,
                offset + limit
            );
            const rows = [];

            storyIds.forEach((storyId) => {
                rows.push(
                    <Story storyId={storyId} key={storyId} />
                )
            });

            return (
                <div id="StoryLinkContainer">
                    <ul className="StoryList">
                        {rows}
                    </ul>
                </div>
            );
        }
    }
}

export default StoryList;