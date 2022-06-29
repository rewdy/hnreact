import React from "react";

import "./Loading.scss";

const LoadingComponent: React.FC = () => {
  return (
    <div className="Loading" aria-busy="true">
      Loading...
    </div>
  );
};

export default LoadingComponent;
