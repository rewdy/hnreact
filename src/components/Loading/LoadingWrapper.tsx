import React from "react";
import { Loading } from ".";

export type Props = {
  isLoading: boolean;
};

const LoadingWrapperComponent: React.FC<Props> = ({ isLoading, children }) => {
  return (
    <React.Fragment>
      {isLoading ? <Loading /> : <React.Fragment>{children}</React.Fragment>}
    </React.Fragment>
  );
};

export default LoadingWrapperComponent;
