import React from "react";

function HomeBanner() {
  return (
    <h1 className="home_title">
      <img src={process.env.PUBLIC_URL + "/imgs/lol_logo.png"} />
      LOL.info
    </h1>
  );
}

export default HomeBanner;
