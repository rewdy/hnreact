import Axios from "axios";

const API_BASE = "https://hacker-news.firebaseio.com/v0/";
const STORY_LIST_URL = `${API_BASE}topstories.json`;
const getStoryUrl = (id: number) =>
  `${API_BASE}item/${id}.json`;

export const getStoryList = async () => {
  try {
    const resp = await Axios.get(STORY_LIST_URL);
    return resp.data;
  } catch(err) {
    console.error("Could not fetch story list", err);
  }
};

export const getStory = async (id: number) => {
  try {
    const resp = await Axios.get(getStoryUrl(id));
    return resp.data;
  } catch(err) {
    console.error(`Could not fetch story id ${id}`, err);
  }
}

const exportables = {
  getStoryList,
  getStory
};
export default exportables;
