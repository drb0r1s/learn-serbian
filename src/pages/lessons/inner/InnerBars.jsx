import React from "react";

const InnerBars = ({ progressBar }) => {
    return(
        <div className="lessons-inner-bars-holder">
            <div className="lessons-inner-progress-bar" ref={progressBar}>
                <div className="lessons-inner-progress-bar-line-helper"></div>
                <div className="lessons-inner-progress-bar-line"></div>
            </div>
        </div>
    );
}

export default InnerBars;