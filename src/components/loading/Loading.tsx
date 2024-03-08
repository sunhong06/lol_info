import React from "react";
import { TailSpin } from "react-loader-spinner";
import "../../scss/Loading.scss";
function Loading() {
  return (
    <div className="loading">
      <TailSpin color="#61dafb" height={80} width={80} />
    </div>
  );
}

export default Loading;
