import React from "react";
import WritingForm from "../../../components/util/community/writing/WritingForm";
import "../../../scss/Community/Writing.scss";

function Writing() {
  return (
    <div className="writing_main">
      <div className="writing_inner">
        <WritingForm />
      </div>
    </div>
  );
}

export default Writing;
