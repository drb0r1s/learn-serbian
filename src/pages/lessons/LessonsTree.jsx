import React from "react";
import LessonsNode from "./LessonsNode";

const LessonsTree = () => {
    return(
        <div className="lessons-tree">
            <div className="lessons-tree-line"></div>
            <LessonsNode type="active" />
            <LessonsNode type="default" />
        </div>
    );
}

export default LessonsTree;