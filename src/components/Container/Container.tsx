import React from "react";
import "../../scss/container.scss";

function Container({ children }: React.PropsWithChildren) {
  return <div className="container">{children}</div>;
}

export default Container;
