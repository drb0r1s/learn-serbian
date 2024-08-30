import React from "react";

const InnerProgressBar = ({ progressBar }) => {
    return(
        <div className="lessons-inner-progress-bar" ref={progressBar}>
            <div className="lessons-inner-progress-bar-line-helper"></div>
            <div className="lessons-inner-progress-bar-line"></div>
        </div>
    );
}

export default InnerProgressBar;