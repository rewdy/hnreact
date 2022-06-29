import React, { useState } from "react";
import moment from "moment";

import { LoadingStatus, Story } from "models";
import { HackerNewsService } from "services";
import { Loading } from "components";

import "./Story.scss";

export type Props = {
  storyId: number;
};

const _timeSince = (thetime: number) => {
  const oneWeekAgo = moment().subtract(7, "days");
  const time = moment.unix(thetime);
  if (time.isAfter(oneWeekAgo)) {
    return time.fromNow();
  }
  return time.format("lll");
};

/**
 * The story component
 */
const StoryComponent: React.FC<Props> = ({ storyId }) => {
  const [status, setStatus] = React.useState<LoadingStatus>("success");
  const [story, setStory] = useState<Story>();

  React.useEffect(() => {
    const fetchStoryList = async () => {
      try {
        setStatus("loading");
        const storyResp = await HackerNewsService.getStory(storyId);
        setStory(storyResp);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        console.log("There was an error loading the story data", err);
      }
    };

    fetchStoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storySrc = `https://news.ycombinator.com/item?id=${storyId}`;
  const storyLink = story?.url || storySrc;

  return (
    <li className="Story" id={storyId.toString()}>
      {status === "loading" && <Loading />}
      {story && (
        <React.Fragment>
          <div className="StoryTitle">
            <a className="StoryLink" href={storyLink}>
              {story.title}
            </a>
          </div>
          <div className="StoryMeta">
            <span className="StoryScore">{story.score}</span>
            <span className="StoryBy">{story.by}</span>
            <a
              className="StoryTime StorySourceLink"
              href={storySrc}
              target="_blank"
              title="Show source story..."
              rel="noopener noreferrer"
            >
              {_timeSince(story.time)}
            </a>
          </div>
        </React.Fragment>
      )}
    </li>
  );
};

export default StoryComponent;
