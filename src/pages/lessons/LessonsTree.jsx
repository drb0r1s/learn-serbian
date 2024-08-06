import React from "react";
import LessonsNode from "./LessonsNode";

const LessonsTree = ({ treeLessons }) => {    
    return(
        <div className="lessons-tree">
            <div className="lessons-tree-node-holder">
                <div className="lessons-tree-line"></div>
                
                {Object.values(treeLessons).map((lesson, index) => {
                    return <LessonsNode lesson={lesson} key={index} />
                })}
            </div>

            <div className="lessons-tree-spacer"></div>
        </div>
    );
}

export default LessonsTree;