import React from "react";
import useExternalData from "../../hooks/useExternalData";
import LessonsNode from "./LessonsNode";

const LessonsTree = () => {
    const lessons = useExternalData("lessons");
    
    return(
        <div className="lessons-tree">
            <div className="lessons-tree-node-holder">
                <div className="lessons-tree-line"></div>
                {Object.values(lessons).map((lesson, index) => {
                    return <LessonsNode lesson={lesson} key={index} />
                })}
            </div>

            <div className="lessons-tree-spacer"></div>
        </div>
    );
}

export default LessonsTree;