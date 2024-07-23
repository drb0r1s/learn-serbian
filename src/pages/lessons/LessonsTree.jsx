import React from "react";
import LessonsNode from "./LessonsNode";

const LessonsTree = () => {
    return(
        <div className="lessons-tree">
            <div className="lessons-tree-node-holder">
                <div className="lessons-tree-line"></div>
                <LessonsNode type="active" />
                <LessonsNode type="default" />
                <LessonsNode type="default" />
                <LessonsNode type="default" />
            </div>

            <div className="lessons-tree-spacer"></div>
        </div>
    );
}

export default LessonsTree;