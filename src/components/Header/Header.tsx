import React from "react";

import "./Header.scss";

const Component: React.FC = () => (
  <header className="AppHeader">
    <div>
      <h1>📰 Hackernews</h1>
      <p className="SubTitle">
        An alternative viewer for{" "}
        <a href="https://news.ycombinator.com/">Hackernews</a>.
      </p>
    </div>
    <div>
      <p className="MadeBy">
        Made with{" "}
        <span role="img" aria-label="joy" style={{ marginRight: "0.25em" }}>
          😂
        </span>{" "}
        by <a href="https://rewdy.lol">Rewdy</a>
      </p>
    </div>
  </header>
);

export default Component;
