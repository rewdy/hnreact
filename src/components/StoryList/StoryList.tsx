import React, { useState } from "react";

import { StoryListResponse, LoadingStatus } from "models";
import { HackerNewsService } from "services";
import { LoadingWrapper, Story } from "components";

import "./StoryList.scss";

// This is the distance in pixels to the bottom of the page
// when scrolling to trigger loading more stories
const BOTTOM_TRIGGER_DISTANCE = 400;
// How many stories to load at once
const LOAD_BATCH = 20;

const StoryListComponent: React.FC = () => {
  const [storyIds, setStoryIds] = useState<StoryListResponse>();
  const [limit, setLimit] = useState<number>(LOAD_BATCH);
  const [status, setStatus] = useState<LoadingStatus>("success");
  const [message, setMessage] = useState<string>();

  // Put this in a ref so that we can use it in the setTimeout function
  // on scroll
  const limitRef = React.useRef(limit);
  limitRef.current = limit;

  const onScrollUpdateStories = () => {
    if (_checkForWindowBottom()) {
      setLimit(limitRef.current + LOAD_BATCH);
    }
  };

  React.useEffect(() => {
    const fetchStoryList = async () => {
      try {
        setStatus("loading");
        const storyIds = await HackerNewsService.getStoryList();
        setStoryIds(storyIds);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setMessage("There was an error loading stories.");
        console.log("There was an error loading story ids", err);
      }
    };

    fetchStoryList();

    // Infinite scroll stuff
    let scrollBuffer: NodeJS.Timeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollBuffer);
      scrollBuffer = setTimeout(onScrollUpdateStories, 150);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storyIdsSubset = storyIds?.slice(0, limit);

  return (
    <div id="StoryLinkContainer">
      {message && <p>{message}</p>}
      <LoadingWrapper isLoading={status === "loading"}>
        <ul className="StoryList">
          {storyIdsSubset?.map((storyId) => (
            <Story key={storyId} storyId={storyId} />
          ))}
        </ul>
      </LoadingWrapper>
    </div>
  );
};

const _checkForWindowBottom = () => {
  const winBottom = window.scrollY + window.innerHeight;
  return winBottom >= document.body.clientHeight - BOTTOM_TRIGGER_DISTANCE;
};

export default StoryListComponent;
