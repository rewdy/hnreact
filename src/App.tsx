import React from "react";
import { Header, StoryList } from "components";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App container">
      <Header />
      <StoryList />
    </div>
  );
};

export default App;
